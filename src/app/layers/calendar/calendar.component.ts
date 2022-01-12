import {Component, OnInit} from '@angular/core';
import {TIMEZONE} from "../../model/app.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "./service/calendar.service";
import {OperatorDto} from "../../model/operatorDto";
import {Salary} from "../../model/salary";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  timeout: boolean = false;
  startDateOption: Date = new Date(new Date().setDate(new Date().getDate() - 1));
  timezoneServer: string = TIMEZONE;
  operatorDtos: OperatorDto[] = [];
  loading: boolean = false;
  salarys: Salary[] = []
  month: number = new Date().getUTCMonth() + 1;
  year: number = new Date().getFullYear();


  // days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  //   15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 31];
  // day: number = new Date().getDate();
  // countDay: number = this.daysInMonth()
  days: number[] = [];


  daysInMonth () {
    // const date: Date = new Date(this.operForm.get(['date'])!.value);
    const date: string[] = this.operForm.get(['date'])!.value.split('-')
     return new Date(Number(date[0]), Number(date[1]), 0).getDate();
  }

  countDays(): number[] {
    this.days = []
    for (let i = 1; i <= this.daysInMonth(); i++) {
      this.days.push(i)
    }
    return this.days
  }
  /*
  Создание формы
   */
  // dateForm: FormGroup = this.createForm();
  operForm: FormGroup = this.createForm();
  nameOperatorDelete: string = '';
  message: string = '';
  errorMessage: string = '';
  nameOperatorAdd = '';

  constructor(private formBuilder: FormBuilder, public calendarService: CalendarService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    // this.findALL()
    console.log('days: ' + this.days)
  }

  findALL() {
    const date: string[] = this.operForm.get(['date'])!.value.split('-')
    this.calendarService.findAllOperators(date[0], date[1])
      .subscribe(response => {
      this.operatorDtos = response;
      this.loading = false;
      this.countDays()
      console.log("this.operForm.get('date')!.value", this.operForm.get('date')!.value)
      console.log(this.operatorDtos)
    })
  }

  submit(): void {
    this.timeout = false;
  }

  /**
   * Активировать запрос новых данных, если пользователь изменил дату и фокус с поля ввода ушёл.
   * Поиск выполнить с задержкой в 1 секунду.
   * @param timeout Флаг, что дата была изменена и
   * @since 0.0.1 -> 0.0.3
   */
  dateChange(timeout: boolean): void {
    this.timeout = timeout;
    if (this.timeout) {
      setTimeout(() => {
        this.dateChangeRun();
      }, 1000);
    }
  }

  /**
   * При изменение поля даты выполнить новый запрос для получения новых данных.
   * @since 0.0.1
   */
  private dateChangeRun(): void {
    if (this.timeout) {
      this.submit();
    }
  }

  /**
   * Создание новой чистой формы.
   */
  private createForm() {
    return this.formBuilder.group({
      "date": [],
      "id": [],
      "fullName": [undefined, [Validators.required, Validators.minLength(1)]]
    });
  }

  /**
   * Сохранение объекта OperatorDto в БД.
   */
  save(): void {
    this.errorMessage = '';
    const oper: OperatorDto = this.readForm();
    {
      console.log('operator add', oper)
      this.create(oper);
    }
  }

  openModalWindowAskAdd(content: any, id: number, fullName: string, salaries: Salary[], hourly_rate: number,
                        total_salary: number, total_hours: number) {
    this.message = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-answer-add'}).result.then(() => {
      console.log('openModalWindowAskAdd before save when add', new OperatorDto(id, fullName, salaries, hourly_rate,
        total_salary, total_hours))
      this.save();
    });
  }

  /**
   * Сохранение объекта OperatorDto в БД.
   * @param operator Новый объект для сохранения в БД.
   * @private
   */
  private create(operator: OperatorDto): void {
    this.calendarService.add(operator).subscribe(() => {
        this.message = 'Сохранение было успешным!';
        this.calendarService.findAllOperators(String(new Date().getFullYear()), String(new Date().getUTCMonth() + 1))
          .subscribe(operator => this.operatorDtos = operator)
      },
      error => {
        if (/.*constraint.*/.test(error.error.message)) {
          this.errorMessage = 'Оператор с таким именем существует!'
        } else {
          this.errorMessage = 'Произошла ошибка при сохранении!'
        }
      });
  }

  openModalWindowAskDelete(del: any, id: number, fullName: string): void {
    this.message = '';
    this.nameOperatorDelete = fullName;
    this.modalService.open(del, {ariaLabelledBy: 'modal-answer-delete'}).result.then(() => {
      this.deleteOperator(id);
    }, () => {
      this.nameOperatorDelete = '';
    });
  }

  deleteOperator(id: number): void {
    this.errorMessage = 'Выполняется удаление темы...';
    this.calendarService.delete(id).subscribe(() => {
      this.errorMessage = '';
      this.message = 'Оператор был успешно удален!';
      this.calendarService.findAllOperators(String(new Date().getFullYear()), String(new Date().getUTCMonth() + 1))
        .subscribe(operator => this.operatorDtos = operator)
    }, () => {
      this.errorMessage = 'При удалении темы произошла ошибка!';
    });
  }

  private readForm(): OperatorDto {
    console.log(this.operForm.get(['fullName'])!.value)
    return {
      id: this.operForm.get(['id'])!.value,
      fullName: this.operForm.get(['fullName'])!.value,
      salaries: [],
      hourly_rate: 0,
      total_hours: 0,
      total_salary: 0,
    };
  }

  test(d: number, op: OperatorDto): number {
    const array: Salary[] = op.salaries.filter(e => {
      return Number(e.date.toString().split("-")[2]) === d;
    });
    if (array.length > 0) {
      return array[0].totalHours
    } else {
      return 0
    }
  }
}
