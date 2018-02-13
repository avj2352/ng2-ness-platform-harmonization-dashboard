import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from 'app/services/auth/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const newRequest = request.clone({
      headers: request.headers.set('sessionId',this.auth.getToken().toString())
    });
    console.log('New Request is: ', newRequest);
    console.log('New Request is: ', newRequest.body);
    return next.handle(request)
    .do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
        console.log('---> filter:', request.params.get('filter'));
      }    
  });
  }
}