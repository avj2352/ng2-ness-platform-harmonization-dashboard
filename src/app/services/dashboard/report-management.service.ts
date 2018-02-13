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

  creatReport(reportObj) {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    console.log("in the report "+reportObj);
    return this.http.post(envConfig.appURL.createReport, JSON.stringify(reportObj), options)
    .delay(this.delaySecond) 
    .map(res => this.extractData(res))
    .catch((error) => {
        return Observable.of(error);
      });
  }//end:creatReport
 
  extractData(res){
    let res1 = res.json;
    return res1 || '';
  }
  updateReport(reportObj) {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(envConfig.appURL.editReport, reportObj, options).delay(this.delaySecond)
      .map(res => {
        
        return res;
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:updateReport

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

  setCloseReport(reportObj, intiatedReportId) {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(envConfig.appURL.closeReport + '/' + intiatedReportId, reportObj, options)
      .map(res => {
        
        return res
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:setCloseReport

  reInitiateReport(data, intiatedReportId) {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(envConfig.appURL.reinitiate + '/' + intiatedReportId, data, options).delay(this.delaySecond)
      .map(res => {       
        return res
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:reInitiateReport

  setinitiateReport(data, intiatedReportId) {
    return this.http.put(envConfig.appURL.initiateReport + '/' + intiatedReportId, data, this.options)
      .map(res => {
        
        return res
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:setinitiateReport

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
