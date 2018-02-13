import { Injectable } from '@angular/core';
import { ResponseContentType, Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {  } from '@angular/common/http';

import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../auth/login.service';
import * as envConfig from './../constants/env.endpoints';
import { json } from 'body-parser';

@Injectable()
export class AdoptionService {
  private headers: Headers;
  private options: RequestOptions;
  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers });
  }//end:constructor

  geUnitType() {
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.get(envConfig.appURL.initiatedReportUnitTypes, this.options)
      .map(res => {
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }//end:geUnitType

  getAllUnitsReport() {
    let headers = this.loginService.getHeaderParams();
    let unitparams = { 'userId': this.loginService.getUserId(), 'roleId': this.loginService.getSelectedRole().id };

    let options = new RequestOptions({ headers: headers, params: unitparams });
    console.log('Adpotion: ', envConfig.appURL.assetAdoption);
    return this.http.get(envConfig.appURL.assetAdoption, options)
      .map(res => {

        return res.json()
      })
      .catch((error) => {
        console.log(error);
        return Observable.of(error);
      });
  }//end:getAllUnitsReport

  getAllReportsAndUnitConfig() {
    let headers = this.loginService.getHeaderParams();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(envConfig.appURL.allReports, options)
      .map(res => {

        return res.json()
      })
      .catch((error) => {
        return Observable.of(error);
      });
  }

  //Get Report by ID : Usage: View
  getAllUnitsReportById(reportId: number) {
    let headers = this.loginService.getHeaderParams();
    let reportParams = { 'userId': this.loginService.getUserId(), 'roleId': this.loginService.getSelectedRole().id, 'reportId': reportId };
    let options = new RequestOptions({ headers: headers, params: reportParams });
    return this.http.get(envConfig.appURL.assetAdoptionByReportID, options)
      .map(res => {

        return res.json()
      })
      .catch((error) => {
        console.log(error);
        return Observable.of(error);
      });

  }

  //Download the report 
  downloadReport(reportId: number) {
    let reportParams = { 'reportId': reportId };
    this.headers = this.loginService.getDownloadHeaderParams();
    this.options = new RequestOptions({ headers: this.headers, params: reportParams, responseType: ResponseContentType.ArrayBuffer });
    return this.http.get(envConfig.appURL.downloadReport, this.options)
      .catch((error) => {
        return Observable.of(error);
      });
  } //end : downloadReport

  //Save the report - FIX for Microsoft Edge related PUT request     
  saveReport(reportId: number, saveReportObj: any) {
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = {};
    saveReportObj = JSON.stringify(saveReportObj);
    let promise = Observable.ajax({
      url: envConfig.appURL.updateAssetAdoption + '/' + reportId,
      method: 'PUT',
      headers: this.headers,
      body: saveReportObj,
    }).map(res => {
      return res;
    })
      .catch((error) => {
        return Observable.of(error._body);
      });
    return promise;
  } //end: saveReport


  extractData(res) {
    let res1 = res.json;
    return res1 || '';
  }

  checkLength(data) {
    if (data.length > 0) {
      return true;
    }
    return false;
  }

  //   submitReport(reportId: number, data:any) { 
  //     let reportParams = { };
  //     console.log(reportId);
  //     let headers = this.loginService.getHeaderParams();
  //     let options = new RequestOptions({headers:headers, params: reportParams});
  //     return this.http.put(envConfig.appURL.assetSubmit+ '/'+reportId,JSON.stringify(data),options).delay(2000)
  //     .map(res => { 
  //       return res
  //     })
  //     .catch((error)=>{
  //       return Observable.of(error);
  //     });
  // } //end: submitReport

  submitReport(reportId: number, submitReportObj: any) {
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = {};
    submitReportObj = JSON.stringify(submitReportObj);
    let promise = Observable.ajax({
      url: envConfig.appURL.assetSubmit + '/' + reportId,
      method: 'PUT',
      headers: this.headers,
      body: submitReportObj,
     // params: reportParams,
    }).map(res => {
      return res;
    })
      .catch((error) => {
        return Observable.of(error);
      });
    return promise;
  } //end: submitReport

  initiateLockReport() {
    this.headers = this.loginService.getHeaderParams();
    let reportParams = { 'userId': this.loginService.getUserId(), 'roleId': this.loginService.getSelectedRole().id };
    this.options = new RequestOptions({ headers: this.headers, params: reportParams });
    return this.http.get(envConfig.appURL.initiateLockReport, this.options)
      .map(res => {

        return res
      })
      .catch((error) => {
        return Observable.of(error);
      });
  } //end:initiateLockReport

  // releaseLockReport(reportId: number) {
  //   let reportParams = { 'reportId': reportId };
  //   this.headers = this.loginService.getHeaderParams();
  //   this.options = new RequestOptions({ headers: this.headers });
  //   console.log(this.options);
  //   return this.http.put(envConfig.appURL.releaseLockReport + '/' + reportId, this.options)
  //     .map(res => {

  //       return res
  //     })
  //     .catch((error) => {
  //       return Observable.of(error);
  //     });
  // } //end:releaseLockReport

  releaseLockReport(reportId: number) {
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = {'reportId': reportId};
    let promise = Observable.ajax({
      url: envConfig.appURL.releaseLockReport + '/' + reportId,
      method: 'PUT',
      headers: this.headers,
      body: '',
    }).map(res => {
      return res;
    })
      .catch((error) => {
        return Observable.of(error);
      });
    return promise;
  } //end: releaseLockReport

}
