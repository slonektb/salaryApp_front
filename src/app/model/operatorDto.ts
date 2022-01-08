import {Salary} from "./salary";

export class OperatorDto {
  id: number;
  fullName: string;
  salaries: Salary[]
  hourly_rate: number
  total_salary: number
  total_hours: number


  constructor(id: number, fullName: string, salaries: Salary[], hourly_rate: number, total_salary: number,
              total_hours: number) {
    this.id = id;
    this.fullName = fullName;
    this.salaries = salaries;
    this.hourly_rate = hourly_rate;
    this.total_salary = total_salary;
    this.total_hours = total_hours;
  }
}
