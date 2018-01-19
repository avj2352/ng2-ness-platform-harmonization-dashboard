import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Injectable()
export class ManageOrganizationService {  
  private options: RequestOptions; 
  private headers:Headers;

  constructor(
    private http:Http,
    private localStorage:LocalStorageService,
    private loginService:LoginService
  ){    
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
   }//end:constructor

  getAllOrganizationTypeConfig(){
    return this.http.get(envConfig.appURL.allOrganizationType,this.options)
      .map(res => {
        // debugger;
        console.log('Get All Organization response', res);
        return res;
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationTypeConfig

}//end:class-ManageOrganizationService
