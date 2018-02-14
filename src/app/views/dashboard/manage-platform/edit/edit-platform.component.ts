import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';

@Component({
    templateUrl: './edit-platform.component.html',
    styleUrls: ['./edit-platform.component.scss']
})
export class EditPlatformComponent implements OnInit {
    public id: number;
    private platformObj: any;
    private isVisibleLoader: boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private patternCheckHierarchy:any;
    constructor(
        private route: ActivatedRoute,
        private managePlatformService: ManagePlatformService,
        private router: Router
    ) {
        this.route.params.subscribe(
            params => {
                this.id = params["id"];
            }
        );
    }

    onCancel()
    {
        this.confirmModel.content="Any unsaved changes may be lost ! Are you sure you want to proceed ?"
        this.isPopupConfirmVisible = true;
    }
    onPopupConfirmOk(eventData: string) {
        this.isPopupConfirmVisible = false;
        this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Platform+'/list');
    }//end:onPopupConfirmOk
    
      onPopupConfirmCancel(eventData: boolean) {
        this.isPopupConfirmVisible = eventData;
      }//end:onPopupConfirmCancel

      onPopupAlertCancel(eventData: boolean){
        this.isPopupAlertVisible = eventData;
      }//end:onPopupAlertCancel

    updatePlatformAction(platformobj) {
        if (platformobj.active == true) {
            platformobj.active = 1;
        } else {
            platformobj.active = 0;
        }
        if (typeof (platformobj.description) != 'undefined' && platformobj.description == null) {
            platformobj.description = '';
        }
        // platformobj.id=this.id;
        this.managePlatformService.updatePlatform(platformobj).subscribe((response) => {
            if (response.status == 401) {
                //var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Update Platform :  " + response.response.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            } 
            else if (response.status != 401 && response.status != 200 )
            {
                if(response.response.generalMessage){
                    this.alertModel.content = "Error in Update Platform :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            } else {
            this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_Platform + '/list');
        }

    },
        (error) => {
            this.alertModel.content = "Error in Update Platform "
            this.isPopupAlertVisible = true;
            console.log(error)
            // this.isVisible = false;
        });
    }

    ngOnInit() {
        this.isVisibleLoader = true;
        this.platformObj = {
            id: this.id,
            name: '',
            code: '',
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
        this.managePlatformService.platformbyid(this.id).subscribe((response) => {
            console.log('Response post method: ', response);
            this.platformObj = response;
            if (this.platformObj.active == 1) {
                this.platformObj.active = true;
            } else {
                this.platformObj.active = false;
            }
            this.isVisibleLoader = false;
            // this.router.navigateByUrl('/dashboard/manage-platform/list');
        },
            (error) => {
                console.log('Response post method: ', error);
                this.isVisibleLoader = false;
                // this.router.navigateByUrl('/dashboard/manage-platform/list');
            });


    }//end:ngOnInit

}//end:class-EditOrganizationComponent