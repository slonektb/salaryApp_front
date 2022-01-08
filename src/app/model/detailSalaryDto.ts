import {DetailSalary} from "./detailSalary";

export class DetailSalaryDto {
  id: number;
  fullName: string;
  salaries: DetailSalary[];
  begin: number;
  end: number;


  constructor(id: number, fullName: string, salaries: DetailSalary[], begin: number, end: number) {
    this.id = id;
    this.fullName = fullName;
    this.salaries = salaries;
    this.begin = begin;
    this.end = end;
  }
}
