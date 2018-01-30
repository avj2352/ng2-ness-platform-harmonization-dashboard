import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
@Injectable()
export class LogoutService {
  private headers: Headers;
  private options: RequestOptions; 
  constructor(private http:Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/json'});   
    this.options = new RequestOptions({ headers: this.headers }); 
   }

   logOut() {
    return this.http.put(envConfig.appURL.logoutEndPoint,this.options)
    .map(res => {
      // debugger;
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(error._body);
    });
   }

}
