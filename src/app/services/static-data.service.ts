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

  getStaticDelay(){
    return this.http
    .get('http://localhost:3000/iatreia')
    .delay(1000)
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:getStaticDelay

}//end:StaticDataService
