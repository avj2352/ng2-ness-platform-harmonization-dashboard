import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Models
import { UserLoginCreditional } from '../../models/user-login';
import { CookieService } from 'ngx-cookie-service';

    // const inputObj = {
    //   email:'bg@philips.com',
    //   password:'Welcome@123'
    // };
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
    private cookieService: CookieService,
    private router: Router
  ){ 
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/json'});   
    this.options = new RequestOptions({ headers: this.headers }); 
  }//end:constructor

  sentData(data:any) { //This is called in Child component
    this.messageData.next(data) //Broadcast
  }//end:changeMessage


  loginUser(userInput:UserLoginCreditional){
    console.log('Login Endpoint is: ',this.cookieService.get('JSESSIONID'));
    this.cookieService.delete('JSESSIONID');
    return this.http.get(envConfig.appURL.loginLDAP,this.options)
    .map(res => {      
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(JSON.parse(error._body));
    });    
  }//end:loginUser

  storeCredentials(inputObj){
    this.localStorage.remove('session');
    this.cookieService.set('phdSession',inputObj.sessionId);
    return this.localStorage.set('session',inputObj);
  }//end:storeToken

  removeCredentials(){
    return this.localStorage.remove('session');
  }//end:removeCredentials

  getSimpleAJAXHeaderParams():any{
    const sessionID = this.getToken().sessionId;    
    return { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Cache-control':'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT', 
    'sessionId':sessionID
    };   
  }//end:getSimpleAJAXHeaderParams

  getHeaderParams():Headers{
    const session :any = this.localStorage.get('session');
    let sessionId =  this.cookieService.get('phdSession');
    if(!sessionId)
    {
    console.log("session invalid");
    this.router.navigateByUrl('/login');
    }
    else{
      console.log('Session ID: ', session.sessionId);
      return new Headers
      ({ 
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      'sessionId':sessionId,
      'Cache-control':'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      });  
    }
 
  }//end:getHeaderParams

  getClientHeaderParams(){
    const session :any = this.localStorage.get('session');
    let sessionId =  this.cookieService.get('phdSession');
    if(!sessionId)
    {
    console.log("session invalid");
    this.router.navigateByUrl('/login');
    }
    else{
      console.log('Session ID: ', session.sessionId);
      let obj = { 
        'Accept': 'application/json',
        'sessionId':sessionId,
        'Cache-control':'no-cache',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
        };
      return JSON.stringify(obj); 
    }
 
  }//end:getHeaderParams

  getUserName(){
    return `${this.getToken().firstName} ${this.getToken().lastName}`;
  }//end:getUserName

  getSelectedRole(){
    return this.getToken().selectedRole;
  }//end:getUserRoles

  verifyAuthScreen(screen){
    let authScreen; 
    let obj = this.getToken();
    if(obj.selectedRole.screens.indexOf(screen) < 0){
        authScreen = this.getToken().selectedRole.screens[0];
    }
    else {
      authScreen = screen;
    }
   return authScreen ;
  }

  getDownloadHeaderParams(): Headers{
    const sessionID = this.getToken().sessionId;
    console.log('Session ID: ', sessionID);
    return new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/vnd.ms-excel',
    'sessionId':sessionID,
    'Cache-control':'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
      });  
  }//getDownloadHeaderParams

  getUserId() {
    return this.getToken().id;
  }
  getToken():any{
    let sessionObj = this.localStorage.get('session');
    console.log('Session object is: ', sessionObj);
    if(!sessionObj)
     {
      this.router.navigateByUrl('/login');
       console.log("session Obj error");
     }
     else{
      return sessionObj;
     }
  }

  getRoleList() {
    return this.getToken().roleList;
  }

  getUserEmail() { 
    return this.getToken().email;
  }

  // setRoleId(data): any {
  //   let sessionObj: any = this.localStorage.get('session');
  //   sessionObj.selectedRole = data;
  //   this.localStorage.set('session',sessionObj);
  //   this.headers = this.getHeaderParams();
  //   this.options = new RequestOptions({ headers: this.headers });
  //   return this.http.put(envConfig.appURL.selectedRole,sessionObj,this.options)
  //   .map(res => {
      
  //     return res.json()
  //   })
  //   .catch((error)=>{
  //     return Observable.of(error);
  //   });
  // }//end: set

  setRoleId(roleObj:any) { 
    let sessionObj: any = this.localStorage.get('session');
    sessionObj.selectedRole = roleObj;

    this.headers = this.getSimpleAJAXHeaderParams();
    sessionObj = JSON.stringify(sessionObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.selectedRole,
      method:'PUT',
      headers:this.headers,
      body:sessionObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: setRoleId

}//end:LoginService
