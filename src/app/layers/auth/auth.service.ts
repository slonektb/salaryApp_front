import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {URL_SERVER} from "../../model/app.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = URL_SERVER + 'login';
  token = '';
  status: number = 0;

  constructor(private http: HttpClient, private router: Router) {
  }


  // login(login: string, password: string): any {
  //   const user: User = new User(0, 0, "", login, password);
  //   this.http.post<any>(this.url, user,
  //     {
  //       headers: {"Content-Type": `application/json`},
  //       observe: 'response'
  //     })
  //     .subscribe(response => {
  //       if (response.status == 200) {
  //         localStorage.setItem('currentUser', user.login);
  //         localStorage.setItem('token', <string>response.headers.get('Authorization'));
  //         this.router.navigate(['/statistic']).then(() => {
  //           window.location.reload();
  //         });
  //       }
  //     }, error => {
  //       return error.status;
  //     });
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  isLogin(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string {
    return <string>localStorage.getItem('token');
  }

  getUserName(): string {
    if (localStorage.getItem('currentUser') !== null) {
      return <string>localStorage.getItem('currentUser');
    }
    return "";
  }
}
