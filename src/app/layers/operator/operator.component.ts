import {Component, OnInit} from '@angular/core';
import {OperatorService} from "./service/operator.service";
import {OperatorDto} from "../../model/operatorDto";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DetailSalaryDto} from "../../model/detailSalaryDto";
import {DetailSalary} from "../../model/detailSalary";


@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],

})
export class OperatorComponent implements OnInit {

  loading: boolean = false;
  detailSalary: DetailSalary[] = []
  operators: OperatorDto[] = [];
  detailSalaryDtos: DetailSalaryDto[] = [];


  clicked: boolean = false
  idx: number = 0;

  constructor(public operatorService: OperatorService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.findAllOperators()

  }

  getAllDetails() {
    this.operatorService.getAllDetails().subscribe(response => {
      this.detailSalary = response
    })
  }

  fillOperators() {
    for (let operator of this.operators) {
      this.formOpers.addControl(String(operator.id), new FormArray([]))
      this.formOpers.addControl(String(operator.id) + '-name', new FormControl(operator.fullName))
    }

    this.addPeriodsToOperator()
  }

  formOpers = this.formBuilder.group({});

  findAllOperators() {
    this.operatorService.findAllOperators(
      String(new Date().getFullYear()), new Date().getUTCMonth() + 1).subscribe(response => {
      this.operators = response;
      this.fillOperators()
    })
  }

  addPeriodsToOperator() {
    this.operatorService.findAllDetailSalary(
      String(new Date().getFullYear()), new Date().getUTCMonth() + 1, new Date().getDay())
      .subscribe(response => {
        this.detailSalaryDtos = response;
        console.log('Данные метода addPeriodsToOperator', this.detailSalaryDtos)
        for (let detailSal of this.detailSalaryDtos) {
          this.formOpers.addControl(String(detailSal.id), new FormArray([]));
          for (let d of detailSal.salaries) {
            const formGroup = new FormGroup({});
            // formGroup.addControl(String('begin' + d.id), new FormControl(d.begin));
            formGroup.addControl(String('begin' + d.id), new FormControl(String('begin' + d.begin), Validators.required));
            // formGroup.addControl(String('end' + d.id), new FormControl(d.end));
            formGroup.addControl('', new FormControl(String(detailSal.end)));
            (<FormArray>this.formOpers.get(String(detailSal.id))).push(formGroup);
          }
        }
        console.log('Данные метода addPeriodsToOperator', this.detailSalaryDtos)
      })
  }

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

  // getOper(): FormArray {
  //   return this.formOpers.get('formOper') as FormArray;
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

  submit() {
    const form = {...this.formOpers}
    console.log("Form: ", form)
  }

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
