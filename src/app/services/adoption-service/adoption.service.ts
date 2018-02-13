import { Injectable } from '@angular/core';
import { ResponseContentType, Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
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
        console.log(error);
        return Observable.of(error);
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
      console.log(error);
      return Observable.of(error._body);
    });

  }

  //Download the report 
  downloadReport(reportId: number) { 
      let reportParams = {  'reportId': reportId };
      this.headers = this.loginService.getDownloadHeaderParams();
      this.options = new RequestOptions({headers:this.headers, params: reportParams, responseType:ResponseContentType.ArrayBuffer});
      return this.http.get(envConfig.appURL.downloadReport,this.options)            
      .catch((error)=>{
        return Observable.of(error._body);
      });
  } //end : downloadReport


    //Save the report 
  saveReport(reportId: number, saveReportObj:any) { 
      this.headers = this.loginService.getSimpleAJAXHeaderParams();
      let reportParams = { };
      console.log(reportId);
      console.log('PUT Request Body as Object is: ', saveReportObj);
      saveReportObj = JSON.stringify(saveReportObj);
      console.log('PUT Request Body as JSON string is: ', saveReportObj);
      let promise = Observable.ajax({
        url:envConfig.appURL.updateAssetAdoption+ '/'+reportId,
        method:'PUT',
        headers:this.headers,
        body:saveReportObj,        
      }).map(res => {
        return res;
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
      return promise;
      // this.options = new RequestOptions({headers:this.headers, params: reportParams});
      // return this.http.put(envConfig.appURL.updateAssetAdoption+ '/'+reportId,data,this.options)
      // .map(res => {
      //   debugger;
      //   return res
      // })
      // .catch((error)=>{
      //   return Observable.of(error._body);
      // });
      // let promise = $.ajax({
      //   url: envConfig.appURL +'/' + reportId,
      //   type: 'PUT',
      //   headers:this.headers,
      //   data: data,
      //   success: function(data) {
      //     alert('Load was performed.');
      //   }
      // });

    //  return Observable.of(promise);
  } //end: saveReport

  submitReport(reportId: number, data:any) { 
    let reportParams = { };
    console.log(reportId);
    this.options = new RequestOptions({headers:this.headers, params: reportParams});
    console.log('PUT Request is: ', data);
    return this.http.put(envConfig.appURL.assetSubmit+ '/'+reportId,data,this.options)
    .map(res => {
      debugger;
      return res
    })
    .catch((error)=>{
      return Observable.of(error._body);
    });
} //end: submitReport

initiateLockReport() { 
  let reportParams = { 'userId': this.loginService.getUserId(), 'roleId':this.loginService.getSelectedRole().id};
  this.options = new RequestOptions({headers:this.headers, params: reportParams});
  return this.http.get(envConfig.appURL.initiateLockReport,this.options)
  .map(res => {
    // debugger;
    return res
  })
  .catch((error)=>{
    return Observable.of(error._body);
  });
} //end:initiateLockReport

releaseLockReport(reportId: number) { 
  let reportParams = { 'userId': this.loginService.getUserId(), 'roleId':this.loginService.getSelectedRole().id, 'reportId': reportId };
  this.options = new RequestOptions({headers:this.headers, params: reportParams});
  return this.http.put(envConfig.appURL.initiateLockReport + '/' + reportId,this.options)
  .map(res => {
    // debugger;
    return res
  })
  .catch((error)=>{
    return Observable.of(error._body);
  });
} //end:initiateLockReport

}
