import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {URL_SERVER} from "../../../model/app.constants";
import {OperatorDto} from "../../../model/operatorDto";
import {DetailSalaryDto} from "../../../model/detailSalaryDto";
import {DetailSalary} from "../../../model/detailSalary";

@Injectable({
  providedIn: 'root'
})

export class OperatorService {

  private url: string = URL_SERVER + "api/operator";
  private http: HttpClient
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 31];

  constructor(http: HttpClient) {
    this.http = http;
  }

  findAllOperators(year: string, month: number): Observable<OperatorDto[]> {
    return this.http.get<OperatorDto[]>(`${this.url}/date/${year}/${month}`);
  }

  findAllDetailSalary(year: string, month: number, day: number): Observable<DetailSalaryDto[]> {
    return this.http.get<DetailSalaryDto[]>(`${this.url}/date/${year}/${month}/${day}`);
  }

  getAllDetails(): Observable<DetailSalary[]> {
    return this.http.get<DetailSalary[]>(`${this.url}/details`)
  }

  // findById(id: number): Observable<{}> {
  //   return this.http.get<OperatorDto>(`${this.url}/${id}`)
  // }

  // findDetailSalaryByDate(date: string): Observable<DetailSalaryDto[]> {
  //   return this.http.get<DetailSalaryDto[]>(`${this.url}/detail/${date}`)
  // }
}

