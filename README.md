# Ng2PlatformHarmonizationDashboard

# Import Static JSON inside Angular

In order to access your file locally in Angular 2+ you must do the following steps:
- Inside your assets folder create a .json file, example: data.json
- Go to your angular.cli.json inside your project and inside the assets array put another object (after the package.json object) like this:
```js
{ "glob": "data.json", "input": "./", "output": "./assets/" }
```
> full example from angular.cli.json
```js
"apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico",
        { "glob": "package.json", "input": "../", "output": "./assets/" },
        { "glob": "data.json", "input": "./", "output": "./assets/" }
      ],
```
> Remember, data.json is just the example file we've previously added in the assets folder (you can name your file whatever you want to)
- Now, try to access your file via localhost. It should be visible within this address, http://localhost:your_port/assets/data.json
- If it's not visible than you've done something incorrectly. Make sure you can access it by typing it in the URL field in your browser before proceeding to step #4.
- Now preform a GET request to retrieve your .json file (you've got your full path .json URL and it should be simple)
```ts
 constructor(private http: HttpClient) {}
        // Make the HTTP request:
        this.http.get('http://localhost:your_port/assets/data.json')
                 .subscribe(data => {
                   console.log(data)
                  });
```

# Difference between Behavior and Subject

| Subject | BehaviorSubject | Replay |
|:--------|:---------------:|-------:|
|1. The Subject constructor will not take any initial value | 1. The BehaviorSubject will always take an initial value |
|2. The Subject observable will only listen to events AFTER its subscription | 2. The BehaviorSubject will listen to both the last RECENT observer and the NEXT observer |


```ts
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StaticDataService {
  mySubject$;

  constructor(
    private http:Http
  ) {

  }//end:constructor

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

  getASubject(){
    this.mySubject$ = new Subject();
    this.mySubject$.next(1);
    this.mySubject$.next(2);
    //this.mySubject$.unscubscribe();
    this.mySubject$.subscribe(3);
    this.mySubject$.next(3);
  }//end:getASubject

  getPackageDetails(){
    return this.http
    .get('http://localhost:4200/assets/package.json')    
    .map(response => response.json())
    .catch((err:Response) => {
      let details = err.json();
      return Observable.throw(new Error('Error occured'));
   });
  }//end:getPackageDetails

  getStaticDelay(){
    return this.http
    .get('http://localhost:4200/assets/data/asset-adoption.json')
    .delay(3000)
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

```

# What the Hell are Operators

Operators are used to modify an observable midstream WITHOUT unwrapping it. 


# Todo-Tasks

- `Sourav`: Change the following values to their respective new names

```js
{
  'reportEdit':'adoptionEntry',
  'quarterlyStatus':'adoptionView'
}
```