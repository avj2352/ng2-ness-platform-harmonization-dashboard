import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Injectable()
export class ManagePlatformService {  
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

  getAllPlatformConfig(){
    return this.http.get(envConfig.appURL.allPlatforms,this.options)
      .map(res => {
        // debugger;
        // console.log('Get All Organization response', res);
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationTypeConfig

  creatPlatform(platformObj){
    return this.http.post(envConfig.appURL.createPlatform,platformObj,this.options)
      .map(res => {
        // debugger;
        // console.log('Get All Platform response', res);
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:creatPlatform

  updatePlatform(platformObj){
    return this.http.put(envConfig.appURL.updatePlatform,platformObj,this.options)
      .map(res => {
        // debugger;
        // console.log('Get All Platform response', res);
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:updatePlatform

  deletePlatform(intiatedReportId){
    return this.http.delete(envConfig.appURL.deletePlatform +'/'+ intiatedReportId ,this.options)
      .map(res => {
        // debugger;
        console.log('response', res);
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:deletePlatform

}//end:class-ManagePlatformService
