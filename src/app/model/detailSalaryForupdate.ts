
export class DetailSalaryForUpdate {
  id:number;
  begin:number;
  end:number;

  constructor(id: number, begin: number, end: number) {
    this.id = id;
    this.begin = begin;
    this.end = end;
  }
}
