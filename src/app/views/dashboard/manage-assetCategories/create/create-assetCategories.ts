import { Component, OnInit } from '@angular/core';
import { ManageAssetCategoriesService } from '../../../../services/dashboard/manage-assetcategories.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';

@Component({
    selector: 'phd-create-assetCategories',
    templateUrl: './create-assetCategories.html',
    styleUrls: ['./create-assetCategories.scss']
})
export class CreateAssetCategoriesComponent implements OnInit {

    private assetObj: any;
    private platformTypeListData: any; 
    private isVisibleParentSelectBox: Boolean;
    private assetValueSelected : Boolean;
    private assetTypeListData :any;
    private platformObj: any;
    private assetTypeObj: any;
    constructor(
        private manageAssetCategoriesService: ManageAssetCategoriesService,
        private managePlatformSerive: ManagePlatformService,
        private router: Router
    ) {


    }//end:constructor
    ngOnInit() {
        this.assetObj = {
            name: '',
            value: '',
            hierarchy: '',
            description: '',
            active:'1'
        }
        this.isVisibleParentSelectBox=false;
        this.assetValueSelected=false;
        this.managePlatformSerive.getAllPlatformConfig().subscribe((response)  =>  {
            this.platformTypeListData = response;
        },
            (error) => {
                console.log('Response post method: ', error);
            });

            this.manageAssetCategoriesService.getAssetTypeList().subscribe((response)  =>  {
                this.assetTypeListData = response;
            },
                (error) => {
                    console.log('Response post method: ', error);
                });
    }//end:ngOnInit

    selectPlatform(platform){
        this.platformObj=platform;
        this.isVisibleParentSelectBox = true;
    }
    selectAssetTypeValue(assetType){
        this.assetTypeObj=assetType;
        this.assetValueSelected=true;
    }

    createAssetCategoriesAction(assetObj){
        assetObj.platform=this.platformObj;
        assetObj.assetType=this.assetTypeObj;
        this.manageAssetCategoriesService.creatAsset(assetObj).subscribe((response)  =>  {
            console.log('Response post method: ', response);
            this.router.navigateByUrl('/dashboard/manage-assetCategories/list');
        },
            (error) => {
                console.log('Response post method: ', error);
                this.router.navigateByUrl('/dashboard/manage-assetCategories/list');
            });
    }  
}//end:CreateAssetCategoriesComponent