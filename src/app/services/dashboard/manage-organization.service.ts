import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from '../../services/auth/login.service';

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
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
    return this.http.get(envConfig.appURL.allOrganizationType,this.options)
      .map(res => {
        
        console.log('Get All Organization response', res);
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationTypeConfig

  getAllOrganizationbyId(id){
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
    return this.http.get(envConfig.appURL.organizationbyId+"/"+id,this.options)
      .map(res => {
        
        console.log('Get All Organization response', res);
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationTypeConfig

  getAllOrganizationbyIdConfig(OrganizationId){
    return this.http.get(envConfig.appURL.allOrganizationTypesbyId+'='+OrganizationId,this.options)
      .map(res => {
        
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationConfigbyid

  // creatOrganization(organizationObj){
  //   return this.http.post(envConfig.appURL.createOrganization,organizationObj,this.options)
  //     .map(res => {
                
  //       return res;
  //     })
  //     .catch((error)=>{
  //       return Observable.of(error);
  //     });
  // }//end:creatOrganization

  creatOrganization(organizationObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    organizationObj = JSON.stringify(organizationObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.createOrganization,
      method:'POST',
      headers:this.headers,
      body:organizationObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: creatOrganization



  updateOrganization(organizationObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    organizationObj = JSON.stringify(organizationObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.updateOrganization,
      method:'PUT',
      headers:this.headers,
      body:organizationObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: updateOrganization

  deleteOrganization(intiatedReportId){
    return this.http.delete(envConfig.appURL.deleteOrganization +'/'+ intiatedReportId ,this.options)
      .map(res => {
                
        return res;
      })
      .catch((error)=>{
        return Observable.of(error);
      });
  }//end:deleteOrganization


}//end:class-ManageOrganizationService
