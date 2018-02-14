import { Component, OnInit } from '@angular/core';
import { ReportManagementService } from 'app/services/dashboard/report-management.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';
import { LoginService } from 'app/services/auth/login.service';


@Component({
    selector: 'phd-create-report',
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
    private isVisible: boolean;
    private organizationTypeListData: ManageHierarchy[];
    private selectOrg: ManageHierarchy;
    private organizationListData: ManageHierarchy[];
    private listofQuarter: any;
    private checkboxSelectedItems: any;
    private checkboxList: any;
    private obj: any;
    private validationCheckbox: boolean;
    private isVisibleLoader: boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    constructor(
        private reportManagementService: ReportManagementService,
        private router: Router,
        private logInService: LoginService
    ) {

    }//end:constructor
    quarteroftheYear(date) {
        var month = date.getMonth() + 1;
        return (Math.ceil(month / 3));
    }

    getListOfQuarter(n, year) {
        var array = [];
        if (n == 4) {
            array.push("Q" + (n - 1) + " " + (year), "Q" + (n) + " " + (year), "Q" + (n - 3) + " " + (year + 1), "Q" + (n - 2) + " " + (year + 1), "Q" + (n - 1) + " " + (year + 1));
        }
        else if (n == 3) {
            array.push("Q" + (n - 1) + " " + (year), "Q" + (n) + " " + (year), "Q" + (n + 1) + " " + (year), "Q" + (n - 2) + " " + (year + 1), "Q" + (n - 1) + " " + (year + 1));
        }
        else if (n == 2) {
            array.push("Q" + (n - 1) + " " + (year), "Q" + (n) + " " + (year), "Q" + (n + 1) + " " + (year), "Q" + (n + 2) + " " + (year), "Q" + (n - 1) + " " + (year + 1))
        }
        else {
            array.push("Q" + (n + 3) + " " + (year - 1), "Q" + (n) + " " + (year), "Q" + (n + 1) + " " + (year), "Q" + (n + 2) + " " + (year), "Q" + (n + 3) + " " + (year))
        }
        return array
    }

    getstartTimeofQuarter(selectedQuarter) {

        var quarterYearNumber = selectedQuarter.charAt(1);
        var year = selectedQuarter.split(" ")[1]
        quarterYearNumber -= 1;
        var firstDate = new Date(year, quarterYearNumber * 3, 1);
        return firstDate;
    }
    getendTimeofQuarter(selectedQuarter) {
        var quarterYearNumber = selectedQuarter.charAt(1);
        var year = selectedQuarter.split(" ")[1]
        var endDate = new Date(year, quarterYearNumber * 3, 0);
        return endDate;
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    onCancel() {
        this.confirmModel.content = "Any unsaved changes may be lost ! Are you sure you want to proceed ?"
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
      
    createReportAction(obj, selectedQuarter) {
        var reportObj = { 'name': '', 'startDate': '', 'endDate': '', 'unitTypeList': [] };
        var checkboxSelectedItemsList = [];
        for (var i = 0; i < this.checkboxSelectedItems.length; i++) {
            checkboxSelectedItemsList.push({
                id: this.checkboxSelectedItems[i],
                active: 1
            })
        }
        var startTimeofQuarterWithOutFormat = this.getstartTimeofQuarter(selectedQuarter)
        var endTimeofQuarterWithOutFormat = this.getendTimeofQuarter(selectedQuarter)
        reportObj.name = obj.name;
        reportObj.startDate = this.formatDate(startTimeofQuarterWithOutFormat);
        reportObj.endDate = this.formatDate(endTimeofQuarterWithOutFormat);
        reportObj.unitTypeList = checkboxSelectedItemsList;
        console.log("report object"+ reportObj);
        this.reportManagementService.creatReport(reportObj).subscribe((response) => {
            if (response.status == 401) {
                //var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in create Report :  " + response.response.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            } 
            else if (response.status != 401 && response.status != 200 )
            {
                if(response.response.generalMessage){
                    this.alertModel.content = "Error in create Report :  " + response.response.generalMessage;
                    this.isPopupAlertVisible = true;
                } else{
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            } else {
                this.router.navigateByUrl('/dashboard/' + envConfig.routerURL.Report_Management + '/list');
            }

        },
            (error) => {
                this.alertModel.content = "Error in Create Report "
                this.isPopupAlertVisible = true;
                console.log(error)
            });
    }

    selectedList(id) {
        var a = this.checkboxSelectedItems.indexOf(id);
        if (a > -1) {
        var index = this.checkboxSelectedItems.indexOf(id)
        this.checkboxSelectedItems.splice(index, 1)
        } else {
        this.checkboxSelectedItems.push(id)
        
        }
        if (this.checkboxSelectedItems.length == 0) {
        this.validationCheckbox = false;
        } else {
        this.validationCheckbox = true;
        }
        };//end:selectedList

    ngOnInit() {
        this.isVisibleLoader = true;
        this.validationCheckbox = true;
        var quarterYear = this.quarteroftheYear(new Date());
        var year = new Date().getFullYear()
        this.listofQuarter = this.getListOfQuarter(quarterYear, year);
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation'
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';
        // alert(vm.listofQuarter)
        if(envConfig.routerURL.Report_Management !== this.logInService.verifyAuthScreen(envConfig.routerURL.Report_Management)){
            this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Report_Management));
          }  
        this.reportManagementService.getallUnitTypes().subscribe((response) => {
          console.log('Response from GetAllOrganziation is: ', response.status);
            // this.organizationTypeListData= response; 
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
            }
            else {
                var listArrayTemp = [];
                response.forEach(element => {
                    listArrayTemp.push(element.id);
                    element.isActive = true;
                });
                this.checkboxList = response;
                this.checkboxSelectedItems = listArrayTemp;
                this.isVisibleLoader = false;
            }
        },
            (error) => {
                this.isVisibleLoader = false;
            });

        this.obj = {
            name: ''
        }
    }//end:ngOnInit
}//end:CreateReportComponent