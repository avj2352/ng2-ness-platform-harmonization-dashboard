import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
//Operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
//Observables
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class StaticDataService {
  myBehavior$;
  private tabNumber$ = new BehaviorSubject<number>(0);
  activeTab$ = this.tabNumber$.asObservable();

  constructor(
    private http:Http
  ) {    
  }//end:constructor

  switchReportTab(tab:number){
    this.tabNumber$.next(tab);
  }//end:switchReportTab  

  createSwitchMapExample(){
    const numbers$ = Observable.interval(1000);
    const letters$ = Observable.of('a','b','c','d');
    return letters$.switchMap(x=>
      numbers$
        .take(5)
        .map(i=>i+x)
    );
  }//end:createSwitchMapExample

  createMergeMapExample(){
    const numbers$ = Observable.interval(1000);
    const letters$ = Observable.of('a','b','c','d');
    return letters$.mergeMap(x=>
      numbers$
        .take(5)
        .map(i=>i+x)
    );
  }//end:createMergeMapExample

  createNumberInterval(){
    const numbers$ =Observable.interval(1000).take(5);
    numbers$.subscribe(x => console.log(x));
  }//end:createNumberInterval

  getSimpleObservable(){
    const observable$ = Observable.create((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    });//end:create

    observable$.subscribe(
      value=>console.log(value),
      err=>{},
      ()=>console.log('This is the end')
    )//end:subsribe

  }//end:getSimpleObservable

  getABehavior(){
    this.myBehavior$ = new BehaviorSubject(200);
    this.myBehavior$.next(1);
    this.myBehavior$.next(2);
    this.myBehavior$.subscribe(3);
  }//end:getASubject

  getPackageDetails(){
    return this.http
    .get('./assets/package.json')    
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:getPackageDetails

  getStaticDelay(){
    return this.http
    .get('http://localhost:4200/assets/data/asset-adoption.json')
    .delay(1000)
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:getStaticDelay

  threeSecondDelay(){
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve();
      },3000);
    });
  }//end:threeSecondDelay

}//end:StaticDataService
