import { Component, OnInit } from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';
import { LoginService } from 'app/services/auth/login.service';


@Component({
    selector: 'phd-create-org',
    templateUrl: './create-org.component.html',
    styleUrls: ['./create-org.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
    private isVisible: boolean;
    private organizationTypeListData: ManageHierarchy[];
    private selectOrg: ManageHierarchy;
    private organizationListData: ManageHierarchy[];
    private parentTypeListData: any;
    private isVisibleParentSelectBox: boolean;
    private isVisibleParentSelectBox1: boolean;
    private parentName: String;
    private orgObj: any;
    private selectedOrgObj: any;
    private selectedChildObj: any;
    private isVisibleLoader:boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private patternCheckHierarchy:any;
    constructor(
        private manageOrgService: ManageOrganizationService,
        private router: Router,
        private logInService: LoginService
    ) {


    }//end:constructor
    ngOnInit() {
        this.isVisibleLoader=true;
        this.orgObj = {
            name: '',
            code: '',
            hierarchy: '',
            description: '',
            active:true
        }
        this.patternCheckHierarchy="^[0-9]{0,2}([.][0-9]{1,3})?$"
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
        this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response)  =>  {
            console.log('Response from GetAllOrganziation is: ', response);
            this.organizationTypeListData =  response;
            this.selectedOrgObj= response[0];
            this.selectedChildObj={};
            this.isVisibleLoader=false;
        },
            (error) => {
                this.isVisible  =  false;
                this.isVisibleLoader=false;
            });
    }//end:ngOnInit


    onCancel()
    {
        this.confirmModel.content="Any unsaved changes may be lost ! Are you sure you want to proceed ?"
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

    createOrgAction(orgObj){

        orgObj.organizationType=this.selectedOrgObj;
        orgObj.parentOrganization=this.selectedChildObj;
        if(orgObj.active==true){
            orgObj.active=1;
        }else{
            orgObj.active=0;
        }

        this.manageOrgService.creatOrganization(orgObj).subscribe((response)  =>  {
            if (response.status == 401) {
                //var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Create Organization :  " + response.response.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            } 
            else if (response.status == 400)
            {
                if(response.response.generalMessage && response.response.errorCode===1010){
                    this.alertModel.content = "Error in Create Organization :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                    setTimeout( () => {
                        this.router.navigateByUrl('/login');
                    },3000)
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }
            else if (response.status != 401 && response.status != 200 )
            {
                if(response.response.generalMessage){
                    this.alertModel.content = "Error in Create Organization :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }else {
            this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Organizations+'/list');
        }

    },
        (error) => {
            this.alertModel.content = "Error in Create Organization "
            this.isPopupAlertVisible = true;
            console.log(error)
        });

    }

    selectParentType(item){
        this.selectedChildObj=item;
        this.isVisibleParentSelectBox1 = true;
    }

    selectOrganizationType(item: ManageHierarchy) {
        this.selectedOrgObj= item;
        if (item.id == 1) {
            this.isVisibleParentSelectBox = false;
            this.isVisibleParentSelectBox1 = true;
            this.selectedChildObj={};
        }
        else {
            this.isVisibleLoader=true;
            this.isVisibleParentSelectBox = true;
            this.isVisibleParentSelectBox1 = true;
            var name;
            this.organizationTypeListData.forEach(function (element) {
                if (element.id == (item.id - 1)) {
                    name = element.name;
                }
            });
            this.parentName = name;
            this.manageOrgService.getAllOrganizationbyIdConfig((item.id - 1)).subscribe((response)  =>  {
                console.log('Response is: ', response);
                this.parentTypeListData  =  response;
                this.selectedChildObj= response[0];
                this.isVisibleLoader=false;
            },
                (error) => {
                    this.isVisible  =  false;
                    this.isVisibleLoader=false;
                });
        }
    }//end:selectOrganizationType()    
}//end:CreateOrganizationComponent