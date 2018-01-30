import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from '../../services/auth/login.service';

@Injectable()
export class ManageAssetCategories {  
  private options: RequestOptions; 
  private headers:Headers;

  constructor(
    private http:Http,
    private localStorage:LocalStorageService,
    private loginService:LoginService
  ){    
    this.headers = this.loginService.getHeaderParams();
    this.options = new RequestOptions({ headers: this.headers }); 
   }//end:constructor

   getAssetCategoryList(){
    return this.http.get(envConfig.appURL.allAsset,this.options)
      .map(res => {
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAssetCategoryList

  getAssetTypeList(){
    return this.http.get(envConfig.appURL.allAssetType,this.options)
      .map(res => {
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAssetTypeList

  creatAsset(assetObj){
    return this.http.post(envConfig.appURL.createAsset,assetObj,this.options)
      .map(res => {
        // debugger;
        // console.log('Get All Platform response', res);
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:creatAsset

  updateAsset(assetObj){
    return this.http.put(envConfig.appURL.updateAsset,assetObj,this.options)
      .map(res => {
        // debugger;
        // console.log('Get All Platform response', res);
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:updateAsset

  deleteAsset(intiatedReportId){
    return this.http.delete(envConfig.appURL.deletePlatform +'/'+ intiatedReportId ,this.options)
      .map(res => {
        // debugger;
        console.log('response', res);
        return res.json()
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:deleteAsset

}//end:class-ManageAssetCategories
