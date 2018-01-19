import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
//Operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
//Observables
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';

@Injectable()
export class LoginService {
  private headers: Headers;
  private options: RequestOptions; 

  constructor(
    private http:Http
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

}//end:LoginService
