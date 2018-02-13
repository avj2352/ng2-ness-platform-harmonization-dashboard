import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';

//Models
import { UserLoginCreditional } from '../../models/user-login';

    // const inputObj = {
    //   email:'bg@philips.com',
    //   password:'Welcome@123'
    // };
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

  loginUser(userInput:UserLoginCreditional){
    console.log('Login Endpoint is: ', envConfig.appURL.loginEndPoint);
    return this.http.get(envConfig.appURL.loginLDAP,this.options)
    .map(res => {
      // debugger;
      return res.json()
    })
    .catch((error)=>{
      return Observable.of(JSON.parse(error._body));
    });    
  }//end:loginUser

  storeCredentials(inputObj){
    return this.localStorage.add('session',inputObj);
  }//end:storeToken

  getSimpleAJAXHeaderParams():any{
    const sessionID = this.getToken().sessionId;    
    return { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Cache-control':'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0', 
    'sessionId':sessionID
    };   
  }//end:getSimpleAJAXHeaderParams

  getHeaderParams():Headers{
    const sessionID = this.getToken().sessionId;
    console.log('Session ID: ', sessionID);
    return new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Cache-control':'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0', 
    'sessionId':sessionID
    });   
  }//end:getHeaderParams

  getStaticHeaderParams():any{
    const sessionID = this.getToken().sessionId;
    return { 'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Cache-control':'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0', 
    'sessionId':sessionID
    }
  }//end:getStaticHeaderParams

  getUserName(){
    return `${this.getToken().firstName} ${this.getToken().lastName}`;
  }//end:getUserName

  getSelectedRole(){
    return this.getToken().selectedRole;
  }//end:getUserRoles

  getDownloadHeaderParams(): Headers{
    const sessionID = this.getToken().sessionId;
    console.log('Session ID: ', sessionID);
    return new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'application/vnd.ms-excel',
    'sessionId':sessionID    });  
  }//getDownloadHeaderParams

  getUserId() {
    return this.getToken().id;
  }
  getToken():any{
    let sessionObj = this.localStorage.get('session');
    console.log('Session object is: ', sessionObj);
    return sessionObj;
  }

}//end:LoginService
