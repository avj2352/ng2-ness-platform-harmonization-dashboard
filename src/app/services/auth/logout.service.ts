import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService} from '../auth/login.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class LogoutService {
  private headers: Headers;
  private options: RequestOptions; 
  constructor(private http:Http ,    
    private loginService: LoginService , 
    private localStorage:LocalStorageService,
    private cookieService: CookieService
  ) {
   
   }

   logOut() {
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
    this.localStorage.clearAll();
    this.cookieService.delete('phdSession');
    this.cookieService.delete('JSESSIONID');
    return this.http.put(envConfig.appURL.logoutEndPoint,'',this.options)
    .map(res => {    
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(error);
    });
   }

}
