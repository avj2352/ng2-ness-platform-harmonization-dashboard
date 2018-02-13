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

  creatAsset(assetObj){
    return this.http.post(envConfig.appURL.createAsset,assetObj,this.options)
      .map(res => {
        
        // console.log('Get All Platform response', res);
        return res;
      })
      .catch((error)=>{
        return Observable.of(error);
      });
  }//end:creatAsset

  updateAsset(assetObj){
    return this.http.put(envConfig.appURL.updateAsset,assetObj,this.options)
      .map(res => {
        
        // console.log('Get All Platform response', res);
        return res;
      })
      .catch((error)=>{
        return Observable.of(error);
      });
  }//end:updateAsset

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
