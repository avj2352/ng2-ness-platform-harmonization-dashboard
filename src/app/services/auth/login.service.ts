import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';


@Injectable()
export class LoginService {
  private headers: Headers;
  private options: RequestOptions; 

  constructor(
    private http:Http,
    private localStorage:LocalStorageService
  ){ 
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/json'});   
    this.options = new RequestOptions({ headers: this.headers }); 
  }//end:constructor

  loginUser(){
    const inputObj = {
      email:'bg@philips.com',
      password:'Welcome@123'
    };
    console.log('Login Endpoint is: ', envConfig.appURL.loginEndPoint);
    return this.http.post(envConfig.appURL.loginEndPoint,inputObj,this.options)
      .map(res => {
        // debugger;
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:loginUser

  storeCredentials(inputObj){
    return this.localStorage.add('session',inputObj);
  }//end:storeToken

  getHeaderParams():Headers{
    const sessionID = this.getToken().sessionId;
    console.log('Session ID: ', sessionID);
    return new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'sessionId':sessionID
    });   
  }//end:getHeaderParams

  getUserName(){
    return `${this.getToken().firstName} ${this.getToken().lastName}`;
  }//end:getUserName

  getSelectedRole(){
    return this.getToken().selectedRole;
  }//end:getUserRoles

  getToken():any{
    let sessionObj = this.localStorage.get('session');
    console.log('Session object is: ', sessionObj);
    return sessionObj;
  }

}//end:LoginService
