import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLogin()) {
      request = request.clone({
        setHeaders: {
          Authorization: '' + this.authService.getToken()
        }
      });
    }
    return next.handle(request);
  }
}
