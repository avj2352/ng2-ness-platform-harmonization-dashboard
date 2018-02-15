import { Component, OnInit } from '@angular/core';
import { ManageAssetCategoriesService } from '../../../../services/dashboard/manage-assetcategories.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import { Route, ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';
import { LoginService } from 'app/services/auth/login.service';

@Component({
    selector: 'phd-edit-assetCategories',
    templateUrl: './edit-assetCategories.html',
    styleUrls: ['./edit-assetCategories.scss']
})
export class EditAssetCategoriesComponent implements OnInit {
    public id: number;
    private assetObj: any;
    private platformTypeListData: any;
    private assetTypeListData : any;
    private platformObj: any;
    private assetTypeObj: any;
    private selectAssetType: any;
    private selectOrg: any;
    private isVisibleLoader: boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private patternCheckHierarchy:any;
    
    constructor(
        private route: ActivatedRoute,
        private manageAssetCategoriesService: ManageAssetCategoriesService,
        private managePlatformSerive: ManagePlatformService,
        private router: Router,
        private logInService: LoginService
    ) {
        this.route.params.subscribe(
            params => {
                this.id = params["id"];
            }
        );
    }

    selectPlatform(platform) {
        this.platformObj = platform;
    }
    selectAssetTypeValue(assetType) {
        this.assetTypeObj = assetType;
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
      }//end:onPopupAlertCancel

    updateAssetCategoriesAction(assetObj) {
        assetObj.platform = this.platformObj;
        assetObj.assetType = this.assetTypeObj;
        if (assetObj.active == true) {
            assetObj.active = 1;
        } else {
            assetObj.active = 0;
        }
        this.manageAssetCategoriesService.updateAsset(assetObj).subscribe((response) => {
            if (response.status == 401) {
                //var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Update Asset :  " + response.response.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            } 
            else if (response.status == 400)
            {
                if(response.response.generalMessage && response.response.errorCode===1010){
                    this.alertModel.content = "Error in Update Asset :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                    setTimeout( () => {
                        this.router.navigateByUrl('/login');
                    },3000)
                } else if(response.response.generalMessage)
                {
                    this.alertModel.content = "Error in Update Asset :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                }  else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }
            else if (response.status != 401 && response.status != 200 )
            {
                if(response.response.generalMessage){
                    this.alertModel.content = "Error in Update Asset :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            } else {
            this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_AssetCategories + '/list');
        }

    },
        (error) => {
            this.alertModel.content = "Error in Update Asset "
            this.isPopupAlertVisible = true;
            console.log(error)
        });
    }

    ngOnInit() {
        this.isVisibleLoader = true;
        this.assetObj = {
            name: '',
            value: '',
            hierarchy: '',
            description: '',
            active: true
        }
        this.patternCheckHierarchy="^[0-9]{0,2}([.][0-9]{1,3})?$"
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation '
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';
    	if(envConfig.routerURL.Manage_AssetCategories !== this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_AssetCategories)){
            this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_AssetCategories));
          }
        this.manageAssetCategoriesService.getAssetbyid(this.id).subscribe((response) => {
            this.assetObj = response;
            this.managePlatformSerive.getAllPlatformConfig().subscribe((response) => {
                this.platformTypeListData  = response;
                response.forEach(element => {
                    if (this.assetObj.platform.id == element.id) {
                        this.selectOrg = element;
                        this.platformObj = element;
                    }
                });
                this.manageAssetCategoriesService.getAssetTypeList().subscribe((response) => {
                    this.assetTypeListData  = response;
                    response.forEach(element => {
                        if (this.assetObj.platform.id == element.id) {
                            this.selectAssetType = element;
                            this.assetTypeObj = element;
                        }
                    });
                    this.isVisibleLoader = false;
                },
                    (error) => {
                        this.isVisibleLoader = false;
                        console.log('Response post method: ', error);
                    });
            },
                (error) => {
                    this.isVisibleLoader = false;
                    console.log('Response post method: ', error);
                });


        },
            (error) => {
                this.isVisibleLoader = false;
                console.log('Response post method: ', error);
            });
        // this.managePlatformSerive.getAllPlatformConfig().subscribe((response)  =>  {
        //     this.platformTypeListData = response;
        // },
        //     (error) => {
        //         console.log('Response post method: ', error);
        //     });

    }//end:ngOnInit
}//end:class-EditOrganizationComponent