import { Injectable } from '@angular/core';
import { ResponseContentType, Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Injectable()
export class ReportManagementService {
  private options: RequestOptions;
  private headers: Headers;
  private delaySecond: number;

  constructor(
    private http: Http,
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers });
    this.delaySecond = 2000;
  }//end:constructor


  getAllReportsAndUnitConfig() {
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get(envConfig.appURL.allReports, this.options)
      .map(res => {      
        return res.json();
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:getAllReportsAndUnitConfig
  getReportbyId(id) {
    let ObservableGet;
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    ObservableGet =  this.http.get(envConfig.appURL.allReports+"/"+id, options)
    .delay(this.delaySecond)
      .map(res => {
        console.log("getreport"+ res);
        return res;
      })
      .catch((error) => {
        console.log("getreporterrorrrrrr"+ error);
        return Observable.of(error);
      });
     return ObservableGet; 
  }//end:getReportbyId


  getallUnitTypes() {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(envConfig.appURL.allUnitTypes, options)
      .delay(this.delaySecond)
      .map(res => {
        
        return res.json();
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:getallUnitTypes

  creatReport(reportObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    reportObj = JSON.stringify(reportObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.createReport,
      method:'POST',
      headers:this.headers,
      body:reportObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: creatReport
 
  extractData(res){
    let res1 = res.json;
    return res1 || '';
  }
  // updateReport(reportObj) {
  //   let headers = this.loginService.getHeaderParams();
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.put(envConfig.appURL.editReport, reportObj, options).delay(this.delaySecond)
  //     .map(res => {
        
  //       return res;
  //     })
  //     .catch((error) => {
  //       return Observable.of(error);
  //     });
  // }//end:updateReport

  updateReport(reportObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    reportObj = JSON.stringify(reportObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.editReport,
      method:'PUT',
      headers:this.headers,
      body:reportObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: updateReport

  deleteReport(intiatedReportId) {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    
    return this.http.delete(envConfig.appURL.deleteReport + '/' + intiatedReportId, options)
      .map(res => {
        
        return res;
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:deleteReport

  // setCloseReport(reportObj, intiatedReportId) {
  //   let headers = this.loginService.getHeaderParams();
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.put(envConfig.appURL.closeReport + '/' + intiatedReportId, reportObj, options)
  //     .map(res => {
        
  //       return res
  //     })
  //     .catch((error) => {
  //       return Observable.of(error);
  //     });
  // }//end:setCloseReport

  setCloseReport(reportObj:any,intiatedReportId: number) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    reportObj = JSON.stringify(reportObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.closeReport + '/' + intiatedReportId,
      method:'PUT',
      headers:this.headers,
      body:reportObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: setCloseReport

  // reInitiateReport(data, intiatedReportId) {
  //   let headers = this.loginService.getHeaderParams();
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.put(envConfig.appURL.reinitiate + '/' + intiatedReportId, data, options).delay(this.delaySecond)
  //     .map(res => {       
  //       return res
  //     })
  //     .catch((error) => {
  //       return Observable.of(error);
  //     });
  // }//end:reInitiateReport

  reInitiateReport(reportObj:any,intiatedReportId: number,) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    reportObj = JSON.stringify(reportObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.reinitiate + '/' + intiatedReportId,
      method:'PUT',
      headers:this.headers,
      body:reportObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: reInitiateReport

  // setinitiateReport(data, intiatedReportId) {
  //   return this.http.put(envConfig.appURL.initiateReport + '/' + intiatedReportId, data, this.options)
  //     .map(res => {
        
  //       return res
  //     })
  //     .catch((error) => {
  //       return Observable.of(error);
  //     });
  // }//end:setinitiateReport

  setinitiateReport( reportObj:any,intiatedReportId: number,) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    reportObj = JSON.stringify(reportObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.initiateReport + '/' + intiatedReportId,
      method:'PUT',
      headers:this.headers,
      body:reportObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: setinitiateReport

  //Download the report 
  downloadReport(reportId: number) {
    let reportParams = { 'reportId': reportId };
    this.headers = this.loginService.getDownloadHeaderParams();
    this.options = new RequestOptions({ headers: this.headers, params: reportParams, responseType: ResponseContentType.ArrayBuffer });
    return this.http.get(envConfig.appURL.downloadReport, this.options)
      .catch((error) => {
        return Observable.of(error._body);
      });
  } //end : downloadReport



}//end:class-reportManagementService
