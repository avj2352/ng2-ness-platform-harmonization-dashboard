import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class StaticDataService {

  constructor(
    private http:Http
  ) {

  }//end:constructor
  getPackageDetails(){
    return this.http
    .get('http://localhost:4200/assets/package.json')    
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:getPackageDetails
  getAdoptionResult(){
    return this.http
    .get('http://localhost:4200/assets/data/asset-adoption.json')
    .delay(3000)
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:getAdoptionResult
  threeSecondDelay(){
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve();
      },3000);
    });
  }//end

  geUnitType(){
    return this.http
    .get('http://localhost:4200/assets/data/unitType.json')
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:geUnitType

}//end:StaticDataService
