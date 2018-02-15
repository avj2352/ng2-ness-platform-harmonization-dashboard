import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ReportManagementService } from 'app/services/dashboard/report-management.service';
import { Observable } from 'rxjs/Observable';
import { debug } from 'util';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';
import { LoginService } from 'app/services/auth/login.service';
import { forEach } from '@angular/router/src/utils/collection';


interface ManageHierarchy {
    id: number;
    name: string;
    code: string;
    hierarchy: number;
};

@Component({
    selector: 'phd-report-management-list',
    templateUrl: './report-management-list.component.html',
    styleUrls: ['./report-management-list.component.scss']
})
export class ReportManagementListComponent implements OnInit {
    private isVisible: boolean;
    private reportListData: ManageHierarchy[];
    private settings: any;
    private isPopupVisible: boolean;
    private trackStatusDetails: any;
    private isVisibleLoader: boolean;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private idDelete: number;
    private idInitiate: number;
    private idReinitiate: number;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;
    private idClose: number;
    private isVisibleIntiate: boolean;
    @Output() selectedDashboardScreen: EventEmitter<string>;
    constructor(
        private reportManagementService: ReportManagementService,
        private router: Router,
        private logInService: LoginService
        // private adoptionService: AdoptionService
    ) {
        // ng-smart-table settings
        this.selectedDashboardScreen = new EventEmitter<string>();
        this.trackStatusDetails = null;
    }//end:constructor

    onPopupInfoClose(event) {
        console.log('Track Status Window closed');
        this.isPopupVisible = false;
    }//end:onPopupInfoClose

    viewReportItemStatus(item) {
        this.isPopupVisible = true;
        this.trackStatusDetails = item;
    }//end:viewReportItemStatus

    onPopupConfirmOk(eventData: string) {
        switch (eventData) {
            case "delete":
                {
                    this.reportManagementService.deleteReport(this.idDelete).subscribe((response) => {
                        if (response.status == 401) {
                            var msg = JSON.parse(response._body)
                            this.alertModel.content = "Error in delete Report :  " + msg.generalMessage;
                            this.isPopupAlertVisible = true;
                            setTimeout( () => {
                                this.router.navigateByUrl('/login');
                            },3000)
                        } 
                        else if (response.status != 401 && response.status != 200 )
                        {
                            var msg = JSON.parse(response._body)
                            this.alertModel.content = "Error in delete Report :  " + msg.generalMessage;
                            this.isPopupAlertVisible = true;
                        }
                            else {
                            window.location.reload();
                        }

                    },
                        (error) => {
                            this.alertModel.content = "Error in delete "
                            this.isPopupAlertVisible = true;
                            console.log(error)
                            // this.isVisible = false;
                        });
                }

                break;
            case "initiate": {
                this.reportManagementService.setinitiateReport('', this.idInitiate).subscribe((response) => {
                    if (response.status == 401) {
                        //var msg = JSON.parse(response._body)
                        this.alertModel.content = "Error in initiate Report :  " + response.response.generalMessage;
                        this.isPopupAlertVisible = true;
                        setTimeout( () => {
                            this.router.navigateByUrl('/login');
                        },3000)
                    } 
                    else if (response.status == 400)
                    {
                        if(response.response.generalMessage && response.response.errorCode===1010){
                            this.alertModel.content = "Error in Initiate Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                            setTimeout( () => {
                                this.router.navigateByUrl('/login');
                            }, 3000)
                        } else if (response.response.generalMessage) {
                            this.alertModel.content = "Error in Initiate Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                        } else {
                            this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                            this.isPopupAlertVisible = true;
                        }

                    }
                    else if (response.status != 401 && response.status != 200 )
                    {
                        if(response.response.generalMessage){
                            this.alertModel.content = "Error in Initiate Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                        } else{
                            this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                            this.isPopupAlertVisible = true;
                        }

                    } else {
                        window.location.reload();
                    }

                },
                    (error) => {
                        this.alertModel.content = "Error in initiate "
                        this.isPopupAlertVisible = true;
                        console.log(error)
                        // this.isVisible = false;
                    });
            }
                break;
            case "reinitiate": {
                this.reportManagementService.reInitiateReport('', this.idReinitiate).subscribe((response) => {
                    if (response.status == 401) {
                        //var msg = JSON.parse(response._body)
                        this.alertModel.content = "Error in reinitiate Report :  " + response.response.generalMessage;
                        this.isPopupAlertVisible = true;
                        setTimeout( () => {
                            this.router.navigateByUrl('/login');
                        },3000)
                    } 
                    else if (response.status == 400)
                    {
                        if(response.response.generalMessage && response.response.errorCode===1010){
                            this.alertModel.content = "Error in reinitiate Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                            setTimeout( () => {
                                this.router.navigateByUrl('/login');
                            }, 3000)
                        } else if (response.response.generalMessage) {
                            this.alertModel.content = "Error in reinitiate Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                        } else {
                            this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                            this.isPopupAlertVisible = true;
                        }

                    }
                    else if (response.status != 401 && response.status != 200 )
                    {
                        if(response.response.generalMessage){
                            this.alertModel.content = "Error in reinitiate Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                        } else{
                            this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                            this.isPopupAlertVisible = true;
                        }

                    } else {
                        window.location.reload();
                    }

                },
                    (error) => {
                        this.alertModel.content = "Error in Reinitiate Report"
                        this.isPopupAlertVisible = true;
                        console.log(error)
                        // this.isVisible = false;
                    });
            }
                break;
            case "close": {
                this.reportManagementService.setCloseReport('', this.idClose).subscribe((response) => {
                    if (response.status == 401) {
                        //var msg = JSON.parse(response._body)
                        this.alertModel.content = "Error in close Report :  " + response.response.generalMessage;
                        this.isPopupAlertVisible = true;
                        setTimeout( () => {
                            this.router.navigateByUrl('/login');
                        },3000)
                    } 
                    else if (response.status == 400)
                    {
                        if(response.response.generalMessage && response.response.errorCode===1010){
                            this.alertModel.content = "Error in close Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                            setTimeout( () => {
                                this.router.navigateByUrl('/login');
                            }, 3000)
                        } else if (response.response.generalMessage) {
                            this.alertModel.content = "Error in close Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                        } else {
                            this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                            this.isPopupAlertVisible = true;
                        }

                    }
                    else if (response.status != 401 && response.status != 200 )
                    {
                        if(response.response.generalMessage){
                            this.alertModel.content = "Error in close Report :  " + response.response.generalMessage;
                            this.isPopupAlertVisible = true;
                        } else{
                            this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                            this.isPopupAlertVisible = true;
                        }

                    } else {
                        window.location.reload();
                    }
                },
                    (error) => {
                        this.alertModel.content = "Error in close Report"
                        this.isPopupAlertVisible = true;
                        console.log(error)
                    });
            }
                break;

            default:
                break;
        }
        this.isPopupConfirmVisible = false;
    }//end:onPopupConfirmClose

    setDashboard(event){
        this.selectedDashboardScreen.emit(envConfig.routerURL.Report_Management);
    }
    onPopupConfirmCancel(eventData: boolean) {
        this.isPopupConfirmVisible = eventData;
    }//end:onPopupConfirmCancel

    onPopupAlertCancel(eventData: boolean) {
        this.isPopupAlertVisible = eventData;
    }

    delete(item) {
        this.idDelete = item.id
        this.confirmModel.content = "Are you sure you want to delete the report ?"
        this.confirmModel.type = "delete";
        this.isPopupConfirmVisible = true;
        // this.confirmModel.type="delete";
    }
    close(item) {
        this.idClose = item.id
        this.confirmModel.content = "Are you sure you want to close the report ?"
        this.confirmModel.type = "close";
        this.isPopupConfirmVisible = true;
    }//end:close

    initiate(item) {
        this.idInitiate = item.id
        this.confirmModel.content = "Are you sure you want to initiate the report ?"
        this.confirmModel.type = "initiate";
        this.isPopupConfirmVisible = true;

    }//end:initiate

    reinitiate(report) {
        this.idReinitiate = report.id
        this.confirmModel.content = "Are you sure you want to reinitiate the report ?"
        this.confirmModel.type = "reinitiate";
        this.isPopupConfirmVisible = true;
    }//end:reinitiate

    downloadReport(selectedReport) {
        this.isVisibleLoader = true;
        let fileName = 'Platform_Adoption_Report.xlsx';
        let a = document.createElement('a');
        this.isVisible = true;
        document.body.appendChild(a);
        this.reportManagementService.downloadReport(selectedReport.id).subscribe(response => {
            console.log('Download response:', response);
            var blob = new Blob([response._body], { type: "application/vnd.ms-excel" });
            var objectUrl = URL.createObjectURL(blob);
            if (navigator.appVersion.toString()
                .indexOf('.NET') > 0) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var fileURL = URL.createObjectURL(blob);
                a.href = fileURL;
                a.download = fileName;
                a.click();
                document.body.removeChild(a);
            }
            this.isVisibleLoader = false;
            console.log(response);
        });
    } //end: downloadReport

    edit(reportItem) {
        this.router.navigate(['/dashboard/' + envConfig.routerURL.Report_Management + '/edit', reportItem.id]);
    }//end(reportItem)

    ngOnInit() {
        this.isVisibleLoader = true;
        this.isPopupVisible = false;
        this.isVisible = true;
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation '
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.alertModel.content = '';
        this.isVisibleIntiate = true;
        // if (envConfig.routerURL.Report_Management !== this.logInService.verifyAuthScreen(envConfig.routerURL.Report_Management)) {
        //     this.router.navigateByUrl('/dashboard/' + this.logInService.verifyAuthScreen(envConfig.routerURL.Report_Management));
        // }
        this.reportManagementService.getAllReportsAndUnitConfig().subscribe((response) => {
            var temp_data = response;
            var index = 1;
            if (response.status && response.status == 401) {
                this.isVisibleLoader = false;
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in get Report :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout( () => {
                    this.router.navigateByUrl('/login');
                },3000)
            }
            else if (response.status && response.status == 400)
            {
                var msg = JSON.parse(response._body)
                if(msg.generalMessage && msg.errorCode===1010){
                    this.alertModel.content = "Error in get Report :  " + msg.generalMessage;
                    this.isPopupAlertVisible = true;
                    setTimeout( () => {
                        this.router.navigateByUrl('/login');
                    }, 3000)
                } else if (msg.generalMessage) {
                    this.alertModel.content = "Error in get Report :  " + msg.generalMessage;
                    this.isPopupAlertVisible = true;
                } else {
                    this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                    this.isPopupAlertVisible = true;
                }

            }
            else if (response.status && response.status != 401 && response.status!=200){
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in get Report :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                this.isVisibleLoader = false;
            }
            else {
                temp_data.forEach(item => {
                    var date = new Date(item.startDate);
                    var month = new Date(item.startDate).getMonth() + 1;
                    var quarterYearnumber = Math.ceil(month / 3);
                    var year = new Date(item.startDate).getFullYear();
                    var quarterYear = "Q" + quarterYearnumber + " " + year;
                    item.quarterYear = quarterYear;
                    item.index = index;
                    index += 1;
                });
                var temp_unitTypeList='';
                temp_data.forEach(element => {
                    if(element.status=="Initiated") {
                        this.isVisibleIntiate=false;
                        } 
                    element.unitTypeList.forEach(item => {
                        temp_unitTypeList=item.name+", "+temp_unitTypeList;  
                    });
                    var res= temp_unitTypeList.slice(0, -2);
                    element.unitTypeListData=res;
                    temp_unitTypeList='';
                                    
                });
                this.reportListData = temp_data;
                this.isVisibleLoader = false;
            }

        },
            (error) => {
                this.isVisible = false;
                this.isVisibleLoader = false;
            });
    }//end:ngOnInit

}//end:class-ReportManagementListComponent    