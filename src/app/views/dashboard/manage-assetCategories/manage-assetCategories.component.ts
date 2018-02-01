import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
      private router:Router
    ) { 
    }//end:constructor
  
    showAddNewAssetCategories(){
      this.activeTab = 1;
      this.router.navigateByUrl('/dashboard/manage-assetCategories/create');
    }//end:showAddNewOrgazniation()
  
    showAssetCategorieslist(){
      this.activeTab = 0;
      this.router.navigateByUrl('/dashboard/manage-assetCategories/list');
    }//end:showAddNewOrgazniation()
    
    ngOnInit() {
      this.activeTab = 0;
      this.router.navigateByUrl('/dashboard/manage-assetCategories/list');
      this.isBreadCrumbVisible = true;
      this.isVisible = false;
    }//end:ngOnInit
}//end : ManageAssetCategoriesComponent