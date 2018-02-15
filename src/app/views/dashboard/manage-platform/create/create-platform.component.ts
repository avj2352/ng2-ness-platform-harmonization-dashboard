import { Component, OnInit } from '@angular/core';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';

@Component({
    selector: 'phd-create-platform',
    templateUrl: './create-platform.component.html',
    styleUrls: ['./create-platform.component.scss']
})
export class CreatePlatformComponent implements OnInit {

    private platformObj: any;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;  
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private patternCheckHierarchy:any;

    constructor(
        private managePlatformService: ManagePlatformService,        
        private router: Router        
    ) {        

    }//end:constructor
    ngOnInit() {
        this.patternCheckHierarchy="^[0-9]{0,2}([.][0-9]{1,3})?$"
        this.platformObj = {
            name: '',
            code: '',
            hierarchy: '',
            description: '',
            active:true
        }
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation '
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';

    }//end:ngOnInit

    onCancel() {
        this.confirmModel.content = "Any unsaved changes may be lost ! Are you sure you want to proceed ?"
        this.isPopupConfirmVisible = true;
    }

    onPopupConfirmOk(eventData: string) {
        this.isPopupConfirmVisible = false;
        this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_Platform + '/list');
    }//end:onPopupConfirmOk

    onPopupConfirmCancel(eventData: boolean) {
        this.isPopupConfirmVisible = eventData;
      }//end:onPopupConfirmCancel

      onPopupAlertCancel(eventData: boolean){
        this.isPopupAlertVisible = eventData;
      }//end:onPopupAlertCancel

    createPlatformAction(platformobj){
        if(platformobj.active==true){
            platformobj.active=1;
        }else{
            platformobj.active=0;
        }
        this.managePlatformService.creatPlatform(platformobj).subscribe((response) => {
            if (response.status == 401) {
                //var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Create Platform :  " + response.response.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            } 
            else if (response.status == 400)
            {
                if(response.response.generalMessage && response.response.errorCode===1010){
                    this.alertModel.content = "Error in Create Platform :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                    setTimeout( () => {
                        this.router.navigateByUrl('/login');
                    },3000)
                } else if(response.response.generalMessage)
                {
                    this.alertModel.content = "Error in Create Platform :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }
            else if (response.status != 401 && response.status != 200 )
            {
                if(response.response.generalMessage){
                    this.alertModel.content = "Error in Create Platform :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }else {
            this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Platform+'/list');
        }

    },
        (error) => {
            this.alertModel.content = "Error in Create Platform "
            this.isPopupAlertVisible = true;
            console.log(error)
        });
    }  
}//end:CreatePlatformComponent