import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class TodoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    console.log("TodoInterceptor: token", token)

    let authRequest = request;
    if (token != null) {
      authRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) })
    }

    //return next.handle(authRequest);

    return next.handle(authRequest).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status != 401) {
            return;
          }
          this.router.navigate(['/login']);
        }
      }));
  }
}

export const todoInterceptor = [{
  provide: HTTP_INTERCEPTORS,
  useClass: TodoInterceptor,
  multi: true
}]