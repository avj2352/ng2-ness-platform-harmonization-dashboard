import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import * as envConfig from './../constants/env.endpoints';
import { LoginService } from '../../services/auth/login.service';

@Injectable()
export class ManageAssetCategoriesService {  
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


  getAssetbyid(id){
    return this.http.get(envConfig.appURL.createAsset+"/"+id,this.options)
      .map(res => {
        return res.json();
      })
      .catch((error)=>{
        return Observable.of(error._body);
      });
  }//end:getAssetbyid

  creatAsset(assetObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    assetObj = JSON.stringify(assetObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.createAsset,
      method:'POST',
      headers:this.headers,
      body:assetObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: creatAsset

  updateAsset(assetObj:any) { 
    this.headers = this.loginService.getSimpleAJAXHeaderParams();
    let reportParams = { };
    assetObj = JSON.stringify(assetObj);
    let promise = Observable.ajax({
      url:envConfig.appURL.updateAsset,
      method:'PUT',
      headers:this.headers,
      body:assetObj,        
    }).map(res => {
      return res;
    })
    .catch((error)=>{
      return Observable.of(error);
    });
    return promise;      
} //end: updateAsset

  deleteAsset(intiatedReportId){
    return this.http.delete(envConfig.appURL.deleteAsset +'/'+ intiatedReportId ,this.options)
      .map(res => {
        
        console.log('response', res);
        return res
      })
      .catch((error)=>{
        return Observable.of(error);
      });
  }//end:deleteAsset

}//end:class-ManageAssetCategoriesService
