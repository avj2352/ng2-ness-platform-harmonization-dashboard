import {Component, OnInit} from '@angular/core';
import { Route,ActivatedRoute, Router } from '@angular/router';
import { ReportManagementService } from '../../../../services/dashboard/report-management.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';
import { LoginService } from 'app/services/auth/login.service';
import { setTimeout } from 'timers';

@Component({
    selector: 'phd-edit-report',
    templateUrl: './edit-report.component.html',
    styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
    public id: number;
    private isVisible: boolean;
    private organizationTypeListData: ManageHierarchy[];
    private selectOrg: ManageHierarchy;
    private organizationListData: ManageHierarchy[];
    private listofQuarter: any;
    private checkboxSelectedItems: any;
    private checkboxList: any;
    private obj: any;
    private validationCheckbox: boolean;
    private prevSelectedCheckbox: any;
    private isVisibleLoader: any;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    constructor(
        private activateRoute: ActivatedRoute,
        private reportManagementService: ReportManagementService,
        private router: Router,
        private logInService: LoginService
    ) {
        this.activateRoute.params.subscribe(
            params => {
                this.id = params["id"];
            }
        );
    }

    updateReportAction(obj) {
        var checkboxSelectedItemsList = [];
        for (var i = 0; i < this.checkboxSelectedItems.length; i++) {
            checkboxSelectedItemsList.push({
                id: this.checkboxSelectedItems[i],
                active: 1
            })
        }
        obj.unitTypeList = checkboxSelectedItemsList;
        this.reportManagementService.updateReport(obj).subscribe((response) => {
            if (response.status && response.status == 401) {
                this.isVisibleLoader = false;
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Update Report :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            }
            else if (response.status && response.status != 401 && response.status!=200){
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in Update Report :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                this.isVisibleLoader = false;
           } else {
                this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Report_Management + '/list');
            }

        },
            (error) => {
                this.alertModel.content = "Error in Update Report "
                this.isPopupAlertVisible = true;
                console.log(error)
                // this.isVisible = false;
            });
    }

    onCancel()
    {
        this.confirmModel.content="Any unsaved changes may be lost ! Are you sure you want to proceed ?"
        this.isPopupConfirmVisible = true;
    }

      onPopupConfirmOk(eventData: string) {
        this.isPopupConfirmVisible = false;
            this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Report_Management+'/list');
      }//end:onPopupConfirmOk
    
      onPopupConfirmCancel(eventData: boolean) {
        this.isPopupConfirmVisible = eventData;
      }//end:onPopupConfirmCancel

      onPopupAlertCancel(eventData: boolean){
        this.isPopupAlertVisible = eventData;
      }//end:onPopupAlertCancel

    selectedList(id) {
        var a = this.checkboxSelectedItems.indexOf(id);
        if (a > -1) {
            var index = this.checkboxSelectedItems.indexOf(id)
            this.checkboxSelectedItems.splice(index, 1)
        } else {
            this.checkboxSelectedItems.push(id)

        }
        if (this.checkboxSelectedItems.length == 0) {
            this.validationCheckbox = false;
        } else {
            this.validationCheckbox = true;
        }
    };//end:selectedQuarter

    checked(id) {
        var a = this.prevSelectedCheckbox.indexOf(id);
        if (a > -1) {
            return true;
        } else {
            return false;
        }

    }

    ngOnInit() {
        this.isVisibleLoader = true;
        this.obj = {
            name: ''
        }
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation'
        this.validationCheckbox = true;
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';
        this.reportManagementService.getReportbyId(this.id).subscribe(async response => {
            var response1=JSON.parse(await response._body);
            if (response.status && response.status === 401) {
                this.isVisibleLoader = false;
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in get report by id :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout(()=> {
                   this.router.navigateByUrl('/login');
                },2000);
            }
            else if (response.status && response.status !== 401 && response.status!== 200){
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in get report by id :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                this.isVisibleLoader = false;
            }
            else if(response.status === 200) {
                console.log('Response post method: ', response1);
                this.obj = response1;
                var listArrayTemp = [];
                response1.unitTypeList.forEach(element => {
                    listArrayTemp.push(element.id);
                });
                this.prevSelectedCheckbox = listArrayTemp;
                this.reportManagementService.getallUnitTypes().subscribe((response) => {
                    if (response.status && response.status == 401) {
                        this.isVisibleLoader = false;
                        var msg = JSON.parse(response._body)
                        this.alertModel.content = "Error in get kpi :  " + msg.generalMessage;
                        this.isPopupAlertVisible = true;
                        setTimeout( () => {
                            this.router.navigateByUrl('/login');
                        },3000)
                    }
                    else if (response.status && response.status != 401 && response.status!=200){
                        var msg = JSON.parse(response._body)
                        this.alertModel.content = "Error in get kpi :  " + msg.generalMessage;
                        this.isPopupAlertVisible = true;
                        this.isVisibleLoader = false;
                    }else{
                        response.forEach(element => {
                            var a = this.prevSelectedCheckbox.indexOf(element.id);
                            if (a > -1) {
                                element.isActive = true;
                            } else {
                                element.isActive = false;
                            }
                        });
                        this.isVisibleLoader=false;
                        this.checkboxList = response;
                        this.checkboxSelectedItems = this.prevSelectedCheckbox;
                    }
                },
                (error) => {
                    this.isVisibleLoader=false;
                    this.isVisible = false;
                    console.error("error in get kpi : "+error)
                    this.router.navigateByUrl('/login');
                });

            // this.router.navigateByUrl('/dashboard/report-management');
            }
        },
            (error) => {
                this.isVisibleLoader=false;
                console.log('Error in get report by id: ', error);
                 this.router.navigateByUrl('/login');
                // this.router.navigateByUrl('/dashboard/report-management');
            });

    }//end:ngOnInit
}//end:class-EditOrganizationComponent
