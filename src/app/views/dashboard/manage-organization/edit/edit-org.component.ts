import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { ManageOrganizationService } from '../../../../services/dashboard/manage-organization.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import * as envConfig from 'app/services/constants/env.endpoints';
import { forEach } from '@angular/router/src/utils/collection';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';
import { LoginService } from 'app/services/auth/login.service';

@Component({
    templateUrl: './edit-org.component.html',
    styleUrls: ['./edit-org.component.scss']
})
export class EditOrganizationComponent implements OnInit {
    public id: number;
    private isVisible: boolean;
    private organizationTypeListData: ManageHierarchy[];
    private selectOrg: any;
    private selectOrgName:string;
    private organizationListData: ManageHierarchy[];
    private parentTypeListData: any;
    private isVisibleParentSelectBox: boolean;
    private parentName: String;
    private orgObj: any;
    private selectedOrgObj: any;
    private selectedChildObj: any;
    private isVisibleLoader: boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private patternCheckHierarchy:any;
    constructor(
        private route: ActivatedRoute,
        private manageOrgService: ManageOrganizationService,
        private router: Router,
        private logInService: LoginService
    ) {
        this.route.params.subscribe(params => {
            this.id = params["id"];
        });
    }


    onCancel() {
        this.confirmModel.content = "Any unsaved changes may be lost ! Are you sure you want to proceed ?"
        this.isPopupConfirmVisible = true;
    }
    
    onPopupConfirmOk(eventData: string) {
        this.isPopupConfirmVisible = false;
        this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_Organizations+ '/list');
    }//end:onPopupConfirmOk
    
    onPopupConfirmCancel(eventData: boolean) {
        this.isPopupConfirmVisible = eventData;
    }//end:onPopupConfirmCancel

    onPopupAlertCancel(eventData: boolean){
        this.isPopupAlertVisible = eventData;
      }//end:onPopupAlertCancel

    updateOrgAction(orgObj) {

        orgObj.organizationType = this.selectedOrgObj;
        orgObj.parentOrganization = this.selectedChildObj;
        if (orgObj.active == true) {
            orgObj.active = 1;
        } else {
            orgObj.active = 0;
        }

        this.manageOrgService.updateOrganization(orgObj).subscribe((response) => {
            if (response.status == 401) {
                //var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Update Organization :  " + response.response.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            } 
            else if (response.status == 400)
            {
                if(response.response.generalMessage && response.response.errorCode===1010){
                    this.alertModel.content = "Error in Update Organization :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                    setTimeout( () => {
                        this.router.navigateByUrl('/login');
                    }, 3000)
                } else if (response.response.generalMessage) {
                    this.alertModel.content = "Error in Create Organization :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else {
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }
            else if (response.status != 401 && response.status != 200 )
            {
                if(response.response.generalMessage){
                    this.alertModel.content = "Error in Update Organization :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }else {
                this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Manage_Organizations + '/list');
            }

        },
            (error) => {
                this.alertModel.content = "Error in Update Organization "
                this.isPopupAlertVisible = true;
                console.log(error)
                // this.isVisible = false;
            });

    }

    selectParentType(item){
        this.selectedChildObj=item;
        // this.isVisibleParentSelectBox1 = true;
    }

    ngOnInit() {
        this.isVisibleLoader=true;
        this.orgObj = {
            name: '',
            code: '',
            hierarchy: '',
            description: '',
            active: true,
            id: this.id
        }
        this.patternCheckHierarchy="^[0-9]{0,2}([.][0-9]{1,3})?$"
        this.selectOrgName = '';
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation '
        this.isVisibleParentSelectBox = false;
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';
         if(envConfig.routerURL.Manage_Organizations !== this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_Organizations)){
            this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_Organizations));
          }  
        this.manageOrgService.getAllOrganizationbyId(this.id).subscribe((response) => {
            console.log('Response from GetAllOrganziation is: ', response);
            this.orgObj = response;
                if (this.orgObj.active == 1) {
                    this.orgObj.active = true;
                } else {
                    this.orgObj.active = false;
                }
            this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response) => {
                console.log('Response from GetAllOrganziation is: ', response);
                this.organizationTypeListData = response;
                response.forEach(element => {
                    if (this.orgObj.organizationType.id == element.id) {
                        this.selectedOrgObj = element;
                        this.selectOrg = element;
                        this.selectOrgName = element.name;
                    }
                });
                var id = this.orgObj.organizationType.id;
                if (id == 1) {
                    this.isVisibleParentSelectBox=false;
                    this.isVisibleLoader=false;

                } else {
                    this.isVisibleParentSelectBox=true;
                    var name;
                    this.organizationTypeListData.forEach(function (element) {
                        if (element.id == (id - 1)) {
                            name = element.name;
                        }
                    });
                    this.parentName = name;
                    this.manageOrgService.getAllOrganizationbyIdConfig((id - 1)).subscribe((response) => {
                        console.log('Response is: ', response);
                        this.parentTypeListData = response;
                        response.forEach(element => {
                            if(this.orgObj.parentOrganization.id==element.id){
                                this.selectedChildObj=element;
                            }                    
                        });
                        this.isVisibleLoader=false;
                    },
                        (error) => {
                            this.isVisibleLoader=false;
                            this.isVisible = false;
                        });

                }
            },
                (error) => {
                    this.isVisibleLoader=false;
                    this.isVisible = false;
                });

        },
            (error) => {
                this.isVisibleLoader=false;
                this.isVisible = false;
            });

    }//end:ngOnInit
}//end:class-EditOrganizationComponent