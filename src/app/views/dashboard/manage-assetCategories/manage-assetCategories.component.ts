import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Component({
    selector: 'app-manage-assetCategories',
    templateUrl: './manage-assetCategories.component.html',
    styleUrls: ['./manage-assetCategories.component.scss']
})
export class ManageAssetCategoriesComponent implements OnInit {
    private isVisible:boolean;
    private isBreadCrumbVisible:boolean;
    private activeTab:number
    constructor(
      private route:ActivatedRoute,
      private router:Router,
      private logInService: LoginService
    ) { 
    }//end:constructor
  
    showAddNewAssetCategories(){
      this.activeTab = 1;
      this.router.navigateByUrl('/dashboard/'+ envConfig.routerURL.Manage_AssetCategories+'/create');
    }//end:showAddNewOrgazniation()
  
    showAssetCategorieslist(){
      this.activeTab = 0;
      this.router.navigateByUrl('/dashboard/'+ envConfig.routerURL.Manage_AssetCategories+'/list');
    }//end:showAddNewOrgazniation()
    
    ngOnInit() {
      this.activeTab = 0;
      this.logInService.sentData(envConfig.routerURL.Manage_AssetCategories);
      this.router.navigateByUrl('/dashboard/'+ envConfig.routerURL.Manage_AssetCategories+'/list');
      if(envConfig.routerURL.Manage_AssetCategories !== this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_AssetCategories)){
        this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_AssetCategories));
      }
      this.isBreadCrumbVisible = true;
      this.isVisible = false;
    }//end:ngOnInit
}//end : ManageAssetCategoriesComponent