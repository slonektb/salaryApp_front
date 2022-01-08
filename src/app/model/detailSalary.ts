import {Salary} from "./salary";

export class DetailSalary {
  id: number;
  salary: Salary;
  begin: number;
  end: number;
  total: number;


  constructor(id: number, salary: Salary, begin: number, end: number, total: number) {
    this.id = id;
    this.salary = salary;
    this.begin = begin;
    this.end = end;
    this.total = total;
  }
}
