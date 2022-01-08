import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {OperatorDto} from "../../../model/operatorDto";
import {HttpClient} from "@angular/common/http";
import {URL_SERVER} from "../../../model/app.constants";

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  private url: string = URL_SERVER + "api/operator";
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  // findAllOperators(): Observable<OperatorDto[]> {
  //   return this.http.get<OperatorDto[]>(this.url);
  // }

  findAllOperators(year: string, month: number): Observable<OperatorDto[]> {
    return this.http.get<OperatorDto[]>(`${this.url}/date/${year}/${month}`);
  }

  /**
   * Добавить объект OperatorDto.
   * @param operator Новый оъект.
   */
  add(operator: OperatorDto): Observable<OperatorDto> {
    return this.http.post<OperatorDto>(`${this.url}/add`, operator);
  }

  /**
   * Удалить объект App по ID.
   * @param id ID объекта, который нужно удалить.
   */
  delete(id: number): Observable<{}> {
    console.log('Delete operator', this.url)
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }
}
