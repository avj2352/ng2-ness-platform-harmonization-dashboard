import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//Models
import { UserLoginCreditional } from '../../models/user-login';
import { StorageService } from 'app/services/storage/storage.service';

  
@Injectable()
export class LoginService {
  private headers: Headers;
  private options: RequestOptions; 
  //To communicate between ReportManagement and Dashboard
  private messageData = new BehaviorSubject<any>({});
  //This is called in parent component as .subscribe
  currentData = this.messageData.asObservable();

  constructor(
    private http:Http,
    private localStorage:LocalStorageService,
    private router: Router,
    private storageService:StorageService
  ){ 
    this.headers = this.getClientHeaderParamsWithoutSessionID();
    this.options = new RequestOptions({ headers: this.headers }); 
  }//end:constructor

  sentData(data:any) { //This is called in Child component
    this.messageData.next(data) //Broadcast
  }//end:changeMessage


  loginUser(userInput:UserLoginCreditional){
    this.storageService.removejSessionCookie();
    return this.http.get(envConfig.appURL.loginLDAP,this.options)
    .map(res => {      
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(JSON.parse(error._body));
    });    
  }//end:loginUser

  //NOTE: This is used only for LDAP login
  getClientHeaderParamsWithoutSessionID(){
    return new Headers({ 
      'Content-Type': 'application/json', 
      'Accept': 'application/json',      
      'Cache-control':'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0', 
      });  
  }//end:getClientHeaderParamsWithoutSessionID
  
  //TODO: Move this to Dashboard Service
  getSimpleAJAXHeaderParams():any{
    const sessionID = this.storageService.getSessionId();
    return { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Cache-control':'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Sat, 01 Jan 2020 00:00:00 GMT', 
    'sessionId':sessionID
    };   
  }//end:getSimpleAJAXHeaderParams

  //TODO: Move this to Dashboard Service
  getHeaderParams():Headers{
    // const session :any = this.localStorage.get('session');
    let sessionId = this.storageService.getSessionId();
    if(!sessionId)
    {
    console.log("session invalid");
    this.router.navigateByUrl('/login');
    }
    else{
      console.log('Session ID: ', sessionId);
      return new Headers({ 
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      'sessionId':sessionId,
      'Cache-control':'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      });  
    }
  }//end:getHeaderParams

  //TODO: Move this to Dashboard Service
  getClientHeaderParams(){
    // const session :any = this.localStorage.get('session');
    let sessionId =  this.storageService.getSessionId();
    if(!sessionId)
    {
    console.log("session invalid");
    this.router.navigateByUrl('/login');
    }
    else{
      console.log('Session ID: ', sessionId);
      let headers = { 
        'Accept': 'application/json',
        'sessionId':sessionId,
        'Cache-control':'no-cache',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
        'Expires': 'Sat, 01 Jan 2020 00:00:00 GMT', 
        };
      return headers;
    }
  }//end:getHeaderParams

  getUserName(){
    return this.storageService.getFullName;
  }//end:getUserName

  getSelectedRole():number{
    const roleType = this.storageService.getSelectedRole();
    return roleType.id;
  }//end:getUserRoles

  //TODO: Move this to Dashboard Service
  verifyAuthScreen(selScreen){
    let authScreen; 
    const selectedRole = this.storageService.getSelectedRole();        
    const screenIndex = selectedRole.screens.indexOf(selScreen);
    //If no screens are found, return the first screen;
    if(screenIndex < 0){
        return selectedRole.screens[0]; 
    }else {
      return selectedRole.screens[screenIndex];
    }   
  }//end:verifyAuthScreen

  //TODO: Move this to Dashboard Service
  getDownloadHeaderParams(): Headers{
    const sessionID = this.storageService.getSessionId();
    console.log('Session ID: ', sessionID);
    return new Headers({ 'Content-Type': 'application/json', 
      'Accept': 'application/vnd.ms-excel',
      'sessionId':sessionID,
      'Cache-control':'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2020 00:00:00 GMT', 
    });  
  }//getDownloadHeaderParams

  getUserId() {
    return this.storageService.getUserId();
  }//end:getUserId

  
  getRoleList() {
    return this.storageService.getListOfRoles();
  }//end:getRoleList

  getUserEmail() { 
    return this.storageService.getEmail();
  }//end:getUserEmail

  //TODO: Move this to Dashboard Service
  setRoleId(roleObj:any) {    
    this.storageService.updateCredentialsWithRole(roleObj);    
    const sessionId = this.storageService.getSessionId(); 
    const payload = JSON.stringify(this.storageService.retrieveCredentials());
    let promise = Observable.ajax({
      url:envConfig.appURL.selectedRole,
      method:'PUT',
      headers:this.getClientHeaderParams(),
      body:payload,
    }).map(res => {
      debugger;
      console.log('Storing the response from switch role server into cookie: ', res.response);
      this.storageService.storeCredentials(res.response);
      console.log('Even the session has been updated');
      return Observable.of(res);
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
  }//end: setRoleId

}//end:LoginService
