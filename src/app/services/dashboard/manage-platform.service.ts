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
  private activePage:number;

  constructor(
    private http:Http,
    private localStorage:LocalStorageService,
    private loginService:LoginService    
  ){    
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
   }//end:constructor

   setActivePlatform(page:number){
     this.activePage = page;
   }//end:setActivePlatform

   getActivePlatform(){
     return this.activePage;
   }//end:getActivePlatform

  getAllPlatformConfig(){
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
    return this.http.get(envConfig.appURL.allPlatforms,this.options)
      .map(res => {
        
        // console.log('Get All Organization response', res);
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationTypeConfig

  platformbyid(id){
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
    return this.http.get(envConfig.appURL.allPlatforms+"/"+id,this.options)
      .map(res => {
        
        // console.log('Get All Organization response', res);
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationTypeConfig

  creatPlatform(platformObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    platformObj = JSON.stringify(platformObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.createPlatform,
      method:'POST',
      headers:this.headers,
      body:platformObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: creatPlatform

  updatePlatform(platformObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    platformObj = JSON.stringify(platformObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.updatePlatform,
      method:'PUT',
      headers:this.headers,
      body:platformObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: updatePlatform

  deletePlatform(intiatedReportId){
    return this.http.delete(envConfig.appURL.deletePlatform +'/'+ intiatedReportId ,this.options)
      .map(res => {
        
        // console.log('response', res);
        // return res.json()
        return res;
      })
      .catch((error)=>{
        return Observable.of(error);
      });
  }//end:deletePlatform

}//end:class-ManagePlatformService
