import {DetailSalaryForUpdate} from "./detailSalaryForupdate";

export class SalaryForUpdate{
  idOperator:number;
  idSalary:number;
  dateSalary:Date;
  detailSalary: DetailSalaryForUpdate[];


  constructor(idOperator: number, idSalary: number, dateSalary: Date, detailSalary: DetailSalaryForUpdate[]) {
    this.idOperator = idOperator;
    this.idSalary = idSalary;
    this.dateSalary = dateSalary;
    this.detailSalary = detailSalary;
  }
}
