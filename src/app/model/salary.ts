export class Salary {
  id: number
  date: Date
  hourlyRate: number
  totalHours: number
  totalSalary: number


  constructor(id: number, date: Date, hourlyRate: number, totalHours: number, totalSalary: number) {
    this.id = id;
    this.date = date;
    this.hourlyRate = hourlyRate;
    this.totalHours = totalHours;
    this.totalSalary = totalSalary;
  }
}
