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
    return this.http.get(envConfig.appURL.allOrganizationType,this.options)
      .map(res => {
        // debugger;
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
        // debugger;
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllOrganizationConfigbyid

  creatOrganization(organizationObj){
    return this.http.post(envConfig.appURL.createOrganization,organizationObj,this.options)
      .map(res => {
        // debugger;        
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:creatOrganization

  updateOrganization(organizationObj){
    return this.http.put(envConfig.appURL.updateOrganization,organizationObj,this.options)
      .map(res => {
        // debugger;        
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:updateOrganization

  deleteOrganization(intiatedReportId){
    return this.http.delete(envConfig.appURL.deleteOrganization +'/'+ intiatedReportId ,this.options)
      .map(res => {
        // debugger;        
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:deleteOrganization


}//end:class-ManageOrganizationService
