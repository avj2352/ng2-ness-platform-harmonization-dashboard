import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { LoginService} from '../auth/login.service';
import * as envConfig from './../constants/env.endpoints';

@Injectable()
export class AdoptionService {
  private headers: Headers;
  private options: RequestOptions; 
  constructor(
    private http:Http,
    private localStorage:LocalStorageService,
    private loginService: LoginService
  ){ 
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
    
  }//end:constructor

  geUnitType(){
    console.log('Adpotion: ', envConfig.appURL.initiatedReportUnitTypes);
    return this.http.get(envConfig.appURL.initiatedReportUnitTypes,this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:geUnitType

  getAllUnitsReport() {
    let unitparams = { 'userId': this.loginService.getUserId(), 'roleId':this.loginService.getSelectedRole().id };
    this.options = new RequestOptions({headers:this.headers, params: unitparams});
    console.log('Adpotion: ', envConfig.appURL.assetAdoption);
    return this.http.get(envConfig.appURL.assetAdoption,this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAllUnitsReport

  getAllReportsAndUnitConfig() { 
    return this.http.get(envConfig.appURL.allReports,this.options)
    .map(res => {
      // debugger;
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(error._body);
    });
  }

 //Get Report by ID : Usage: View
  getAllUnitsReportById(reportId:number) {
    let reportParams = { 'userId': this.loginService.getUserId(), 'roleId':this.loginService.getSelectedRole().id, 'reportId': reportId };
    this.options = new RequestOptions({headers:this.headers, params: reportParams});
    return this.http.get(envConfig.appURL.assetAdoptionByReportID,this.options)
    .map(res => {
      // debugger;
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(error._body);
    });

  }

  //Download the report 
  downloadReport(reportId: number) { 
      let reportParams = { 'userId': this.loginService.getUserId(), 'roleId':this.loginService.getSelectedRole().id, 'reportId': reportId };
      this.headers = this.loginService.getDownloadHeaderParams();
      this.options = new RequestOptions({headers:this.headers, params: reportParams});
      return this.http.get(envConfig.appURL.downloadReport,this.options)
      .map(res => {
        // debugger;
        return res
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }

}
