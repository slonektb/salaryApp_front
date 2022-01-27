import {Component, OnInit, ViewChild} from '@angular/core';
import {OperatorService} from "./service/operator.service";
import {OperatorDto} from "../../model/operatorDto";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import {DetailSalaryDto} from "../../model/detailSalaryDto";
import {DetailSalary} from "../../model/detailSalary";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Salary} from "../../model/salary";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";



@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],

})
export class OperatorComponent implements OnInit {

  sal: Salary = new Salary(0,new Date(),0,0,0);
  loading: boolean = false;
  detailSalary: DetailSalary[] = [];
  detailSalaryDtos: DetailSalaryDto[] = [];
  detailSalaryDtosForSave: DetailSalaryDto[] = [];
  // operatorDTO: OperatorDto[] = [];
  subscription: Subscription;
  day: string = '';
  month: string = '';
  year: string = '';
  datePaginator = new Date();

  dateEdit: String = '';

  clicked: boolean = false

  constructor(public operatorService: OperatorService, private formBuilder: FormBuilder
              , activateRoute: ActivatedRoute, private modalService: NgbModal) {
    this.subscription = activateRoute.params.subscribe(params => this.day = params['day']),
    this.subscription = activateRoute.params.subscribe(params => this.month = params['month']),
    this.subscription = activateRoute.params.subscribe(params => this.year = params['year'])
  }

  ngOnInit(): void {
    this.findAllOperators()
    this.dateEdit = (this.day.length > 1 ? this.day:"0" + this.day) + "." + (this.month.length > 1 ? this.month: "0" + this.month) + "." + this.year;
  }

  getAllDetails() {
    this.operatorService.getAllDetails().subscribe(response => {
      this.detailSalary = response
    })
  }

  fillOperators() {
   // console.log(this.detailSalaryDtos)
    let salId: number = -1;
    let totalHours: number = 0;
    for (let operator of this.detailSalaryDtos) {
      const arrayPeriod = this.formBuilder.array([]);
      for (let period of operator.salaries) {
        salId = period.salary.id;
        totalHours = period.salary.totalHours;
        arrayPeriod.push(this.formBuilder.group({
          id: [period.id],
          begin: [{value: period.begin, disabled: true}],
          end: [{value: period.end, disabled: true}]
        }))
      }
     // console.log(arrayPeriod);
      (this.formOpers.get('opers') as FormArray).push(
        this.formBuilder.group({
          id: [operator.id],
          fullName: [operator.fullName],
          periods: [arrayPeriod],
          salId: [salId],
          totalHours: [totalHours]
        })
      )
      // this.formOpers.addControl(String(operator.id), new FormArray([]))
      // this.formOpers.addControl(String(operator.id) + '-name', new FormControl(operator.fullName))
    }
    console.log(this.formOpers)
    // this.addPeriodsToOperator()
  }

  formOpers = this.formBuilder.group({
    opers: this.formBuilder.array([]),
  });

  findAllOperators() {
    // this.datePipe.transform(this.datePaginator, 'yyyy-MM-dd');
    this.operatorService.findAllDetailSalary(this.year, Number(this.month), Number(this.day))
      .subscribe(response => {
      this.detailSalaryDtos = response;
      this.fillOperators()
    })
  }

  getOpers(): FormArray {
   // console.log(this.formOpers.get('opers') as FormArray)
    return this.formOpers.get('opers') as FormArray;
  }

  getPeriods(arrayPeriod: AbstractControl | null): FormArray {
     //console.log(arrayPeriod as FormArray)
    if (arrayPeriod) {

       // console.log(arrayPeriod.value as FormArray)
        return (arrayPeriod as FormArray);

    }
    return new FormArray([]);
  }

  perForm: FormGroup = this.createForm();
  message: string = '';
  strPeriodForDel: string = '';

  private createForm() {
    return this.formBuilder.group({
       "begin1": [0, [Validators.required, Validators.minLength(1)]],
       "end1": [0, [Validators.required, Validators.minLength(1)]]
    });
  }

  save(idx:number):void {
    let begin = this.perForm.get('begin1')!.value;
    let end = this.perForm.get('end1')!.value;
    const formGroup = new FormGroup({});
    formGroup.addControl(String('id' ), new FormControl(-1));
    formGroup.addControl(String('begin' ), new FormControl({value: begin, disabled: true}));
    formGroup.addControl(String('end' ), new FormControl({value: end, disabled: true}));

    (<FormArray>this.getOpers().at(idx).get("periods")?.value).push(formGroup);

  }

  openModalWindowAskAdd(content: any, id: number) {
    this.message = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-answer-add'}).result.then(() => {
        this.save(id);
    });
  }

  openModalWindowAskDelete(del: any, idOper: number, idPerod: number, str: string): void {
    this.message = '';
    this.strPeriodForDel = str;
    this.modalService.open(del, {ariaLabelledBy: 'modal-answer-delete'}).result.then(() => {
      this.rmPeriodromOpers(idOper,idPerod);
    }, () => {
      this.strPeriodForDel = '';
    });
  }
  addPeriodsToOperator() {
     // this.operatorService.findAllDetailSalary(
     //   String(new Date().getFullYear()), new Date().getUTCMonth() + 1, new Date().getDay())
     //   .subscribe(response => {
     //     // this.detailSalaryDtos = response;
     //     console.log('Данные метода addPeriodsToOperator (start)', this.detailSalaryDtos)
     //     for (let detailSal of this.detailSalaryDtos) {
     //       this.formOpers.addControl(String(detailSal.id), new FormArray([]));
     //       for (let d of detailSal.salaries) {
     //         const formGroup = new FormGroup({});
     //         formGroup.addControl(String('begin' + d.id), new FormControl(d.begin));
     //         formGroup.addControl(String('end' + d.id), new FormControl(d.end));
     //
     //         (<FormArray>this.formOpers.get(String(detailSal.id))).push(formGroup);
     //       }
     //     }
     //     console.log('Данные метода addPeriodsToOperator (finish)', this.detailSalaryDtos)
     //   })


  }

  rmPeriodromOpers(idxOper:number,idxPeriod:number) {
        (<FormArray>this.getOpers().at(idxOper).get("periods")?.value).removeAt(idxPeriod);
  }

  submit() {
    // const form = {...this.formOpers}
    // console.log("Form: ", form)


    this.detailSalaryDtosForSave = [];

    for (let oper of  this.getOpers().controls) {

      let detailSalary1: DetailSalary[] = [];

      let dayStr: String = this.day;
      let monthStr: String = this.month;
      if (dayStr.length < 2) dayStr = "0" + dayStr;
      if (monthStr.length < 2) monthStr = "0" + monthStr;

      let salDate = new Date(this.year + "-" + monthStr + "-" + dayStr);
      this.sal.date = salDate;
      this.sal.id = oper.value.salId;
      oper.get("periods")?.value.enable();
      let sumHours: number = 0;
      for (let period of oper.get("periods")!.value.controls) {

        let b: number = period.value.begin;
        let e: number = period.value.end;
        let sum:number = e - b;
        sumHours = sumHours + sum;
        detailSalary1.push({
          id: period.value.id,
          salary: this.sal,
          begin: b,
          end: e,
          total: sum
        })
      }
      oper.get("periods")?.value.disable();

      oper.get("totalHours")!.setValue(sumHours);

      this.detailSalaryDtosForSave.push( {begin: 0, end: 0, fullName: oper.value.fullName, salaries: detailSalary1, id: oper.value.id});
    }
    console.log(this.detailSalaryDtosForSave);
  }

  // change() {
  //   this.formOpers.removeControl(this.);
  //   this.controlDir.name = this.currentFormControlName = 'email'
  //   this.formDir.addControl(this.controlDir);
  // }

  // test() {
  //   //
  //
  //   for (let detailSal of this.detailSalaryDtos) {
  //     this.formOpers.addControl(String(detailSal.id), new FormArray([]));
  //     for (let d of detailSal.salaries) {
  //       const formGroup = new FormGroup({});
  //       formGroup.addControl(String('begin' + d.id), new FormControl(d.begin));
  //       formGroup.addControl(String('end' + d.id), new FormControl(d.end));
  //       (<FormArray>this.formOpers.get(String(detailSal.id))).push(formGroup);
  //     }
  //   }
  // }


  // getSum(): number {
  //   let sum = 0;
  //   for (let period of this.getOper().controls) {
  //     sum = period.get('end')?.value - period.get('begin')?.value
  //   }
  //   return sum;
  // }

  // addOper(id: number, name: string) {
  //   this.idx++
  //   this.getOper().push(this.initOperator(id, name));
  // }

  // initOperator(id: number, fullName: string): FormGroup {
  //   return this.formBuilder.group({
  //     id: [id],
  //     fullName: [fullName],
  //     periods: this.formBuilder.array([])
  //   })
  // }



  // addPeriod(id: number) {
  //   this.idx++
  //   const control = new FormGroup('begin', Validators.required);
  //   (this.operForm.get('plus') as FormArray).push(control)
  //   // (this.operForm.get(String(id)) as FormArray).push(control)
  // }

  // sumInputs(): number {
  //   return this.sum = this.end - this.begin
  // }

  // save(): void {
  //   const oper: formOper = this.readForm();
  //   if (theme && theme.id) {
  //     console.log('в методе save перед update', theme)
  //     this.update(theme);
  //   } else {
  //     console.log('theme add', theme)
  //     this.create(theme);
  //   }
  // }

  // private create(theme: Theme): void {
  //   this.operatorService.(theme).subscribe(() => {
  //       this.message = 'Сохранение было успешным!';
  //       this.themeService.findAllTheme().subscribe(theme => this.themes = theme)
  //     },
  //     error => {
  //       if (/.*constraint.*/.test(error.error.message)) {
  //         this.errorMessage = 'Тематика с таким именем существует!'
  //       } else {
  //         this.errorMessage = 'Произошла ошибка при сохранении!'
  //       }
  //     });
  // }
  /**
   * Чтение данных из формы и сохранения их в объект OperatorDto.
   * @private
   */
  // private readForm(): OperatorDto {
  //   console.log(this.operForm.get(['fullName'])!.value)
  //   return {
  //     id: this.operForm.get(['id'])!.value,
  //     fullName: this.operForm.get(['fullName'])!.value,
  //     salaries: [],
  //     hourly_rate: 0,
  //     total_hours: 0,
  //     total_salary: 0,
  //   };
  // }
  // private initPeriod(begin: number, end: number): FormGroup {
  //   return this.formBuilder.group({
  //     begin: [begin],
  //     end: [end]
  //   });
  // }
  // formPeriod = this.formBuilder.group({
  //   id: [],
  //   fullName: [],
  //   periods: this.formBuilder.array([]),
  //   sum: this.formOpers.get('salaries')?.get('totalHours')
  //
  // });
  // addPeriodsToOperator() {
  //   for (let operator of this.operators) {
  //     for (let detail of this.details) {
  //       (<FormArray>this.formOpers.get('id')).push(
  //         new FormGroup({
  //           begin: new FormControl(detail.begin),
  //           end: new FormControl(detail.end)
  //         })
  //       );
  //     }
  //   }
  // }
  // fillPeriods(details: DetailSalaryDto[]): FormArray {
  //   let result = this.formBuilder.array([])
  //   details.forEach(detail => {
  //     result.push(this.formBuilder.group({
  //       begin: [detail.begin],
  //       end: [detail.end]
  //     }))
  //   })
  //   return result
  // }
}
