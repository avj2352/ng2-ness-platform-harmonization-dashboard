import { Injectable } from '@angular/core';
import { ResponseContentType, Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Injectable()
export class ReportManagementService {
  private options: RequestOptions;
  private headers: Headers;

  constructor(
    private http: Http,
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers });
  }//end:constructor

  getAllReportsAndUnitConfig() {
    return this.http.get(envConfig.appURL.allReports, this.options)
      .map(res => {
        // debugger;
        return res.json();
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:getAllReportsAndUnitConfig

  getallUnitTypes() {
    return this.http.get(envConfig.appURL.allUnitTypes, this.options)
      .map(res => {
        // debugger;
        return res.json();
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:getallUnitTypes

  creatReport(reportObj) {
    return this.http.post(envConfig.appURL.createReport, reportObj, this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:creatReport

  updateReport(reportObj) {
    return this.http.put(envConfig.appURL.editReport, reportObj, this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:updateReport

  deleteReport(intiatedReportId) {
    return this.http.delete(envConfig.appURL.deleteReport + '/' + intiatedReportId, this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:deleteReport

  setCloseReport(reportObj, intiatedReportId) {
    return this.http.put(envConfig.appURL.closeReport + '/' + intiatedReportId, reportObj, this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:setCloseReport

  reInitiateReport(data, intiatedReportId) {
    return this.http.put(envConfig.appURL.reinitiate + '/' + intiatedReportId, data, this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error._body);
      });
  }//end:reInitiateReport

  setinitiateReport(data, intiatedReportId) {
    return this.http.put(envConfig.appURL.initiateReport + '/' + intiatedReportId, data, this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error) => {
        return Observable.of(error._body);
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
