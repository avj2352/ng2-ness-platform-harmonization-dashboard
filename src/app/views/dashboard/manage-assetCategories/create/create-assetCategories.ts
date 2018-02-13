import { Component, OnInit } from '@angular/core';
import { ManageAssetCategoriesService } from '../../../../services/dashboard/manage-assetcategories.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { LoginService } from 'app/services/auth/login.service';
import { AlertModel } from '../../models/alertModel';

@Component({
    selector: 'phd-create-assetCategories',
    templateUrl: './create-assetCategories.html',
    styleUrls: ['./create-assetCategories.scss']
})
export class CreateAssetCategoriesComponent implements OnInit {

    private assetObj: any;
    private platformTypeListData: any;
    private isVisibleParentSelectBox: Boolean;
    private assetValueSelected: Boolean;
    private assetTypeListData : any;
    private platformObj: any;
    private assetTypeObj: any;
    private isVisibleLoader: boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private patternCheckHierarchy:any;
    
    constructor(
        private manageAssetCategoriesService: ManageAssetCategoriesService,
        private managePlatformSerive: ManagePlatformService,
        private router: Router,
        private logInService: LoginService
    ) {


    }//end:constructor
    ngOnInit() {
        this.patternCheckHierarchy="^[0-9]{0,2}([.][0-9]{1,3})?$"
        this.isVisibleLoader = true;
        this.assetObj = {
            name: '',
            value: '',
            hierarchy: '',
            description: '',
            active: true
        }
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation'
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';
        this.isVisibleParentSelectBox = false;
        this.assetValueSelected = false;
        if(envConfig.routerURL.Manage_AssetCategories !== this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_AssetCategories)){
            this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_AssetCategories));
          }
        this.managePlatformSerive.getAllPlatformConfig().subscribe((response) => {
            this.platformTypeListData  = response;
            this.manageAssetCategoriesService.getAssetTypeList().subscribe((response) => {
                this.isVisibleLoader = false;
                this.assetTypeListData  = response;
            },
                (error) => {
                    console.log('Response post method: ', error);
                    this.isVisibleLoader = false;
                });
        },
            (error) => {
                this.isVisibleLoader = false;
                console.log('Response post method: ', error);
            });
    }//end:ngOnInit

    selectPlatform(platform) {
        this.platformObj = platform;
        this.isVisibleParentSelectBox = true;
    }
    selectAssetTypeValue(assetType) {
        this.assetTypeObj = assetType;
        this.assetValueSelected = true;
    }

    onCancel()
    {
        this.confirmModel.content="Any unsaved changes may be lost ! Are you sure you want to proceed ?"
        this.isPopupConfirmVisible = true;
    }

      onPopupConfirmOk(eventData: string) {
        this.isPopupConfirmVisible = false;
        this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_AssetCategories + '/list');
      }//end:onPopupConfirmOk
    
      onPopupConfirmCancel(eventData: boolean) {
        this.isPopupConfirmVisible = eventData;
      }//end:onPopupConfirmCancel

      onPopupAlertCancel(eventData: boolean){
        this.isPopupAlertVisible = eventData;
      }

    createAssetCategoriesAction(assetObj) {
        assetObj.platform = this.platformObj;
        assetObj.assetType = this.assetTypeObj;
        if (assetObj.active == true) {
            assetObj.active = 1;
        } else {
            assetObj.active = 0;
        }
        this.manageAssetCategoriesService.creatAsset(assetObj).subscribe((response) => {
        if (response.status != 200) {
            var msg = JSON.parse(response._body)
            this.alertModel.content = "Error in Create Asset :  " + msg.generalMessage;
            this.isPopupAlertVisible = true;
        } else {
            this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_AssetCategories + '/list');
        }

    },
        (error) => {
            this.alertModel.content = "Error in Create Asset "
            this.isPopupAlertVisible = true;
            console.log(error)
        });


    }
}//end:CreateAssetCategoriesComponent