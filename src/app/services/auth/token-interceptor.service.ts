import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from 'app/services/storage/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public storageService: StorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const newRequest = request.clone({
      headers: request.headers.set('sessionId',this.storageService.getSessionId())
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