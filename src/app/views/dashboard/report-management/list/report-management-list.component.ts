import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ReportManagementService } from 'app/services/dashboard/report-management.service';
import { Observable } from 'rxjs/Observable';
import { debug } from 'util';

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

    constructor(
        private reportManagementService: ReportManagementService,
        // private adoptionService: AdoptionService
    ) {
        // ng-smart-table settings        
        this.trackStatusDetails = null;
    }//end:constructor

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.reportManagementService.deleteReport(event.data.id).subscribe((response) => {
                console.log(response)
            },
                (error) => {
                    console.log(error)
                    // this.isVisible = false;
                });
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }//end:onDeleteConfirm

    onPopupInfoClose(event) {
        console.log('Track Status Window closed');
        this.isPopupVisible = false;
    }//end:onPopupInfoClose

    viewReportItemStatus(item) {
        this.isPopupVisible = true;
        this.trackStatusDetails = item;
    }//end:viewReportItemStatus

    delete(item) {
        this.reportManagementService.deleteReport(item.id).subscribe((response) => {
            window.location.reload();
        },
            (error) => {
                this.isVisible = false;
            });
    }//end:delete
    close(item) {
        this.reportManagementService.setCloseReport('',item.id).subscribe((response) => {
            window.location.reload();
        },
            (error) => {
                this.isVisible = false;
            });
    }//end:close

    initiate(item) {
        this.reportManagementService.setinitiateReport('',item.id).subscribe((response) => {
            window.location.reload();
        },
            (error) => {
                this.isVisible = false;
            });
    }//end:initiate

    reinitiate(report) {
        console.log(report);
        this.reportManagementService.reInitiateReport('',report.id).subscribe(function (response) {
            console.log(response)
            window.location.reload();
        },
            (error) => {
                console.log(error)
                if (error.status == 400) {
                    var errorStatus = error.data.generalMessage;
                    // vm.errorMessage = errorStatus;

                    console.error('Error running Save operation', errorStatus);

                }
                // this.isVisible = false;
            });
    }

    downloadReport(selectedReport) {
        let fileName = 'Platform_Adoption_Report.xlsx';
        let  a = document.createElement( 'a' );
        document.body.appendChild( a );
        this.reportManagementService.downloadReport(selectedReport.id).subscribe(response => {
          console.log('Download response:', response);
          var blob = new Blob([response._body], {type: "application/vnd.ms-excel"});
          var objectUrl = URL.createObjectURL(blob);
          if ( navigator.appVersion.toString()
            .indexOf( '.NET' ) > 0 ) {
            window.navigator.msSaveBlob( blob, fileName );
          } else {
            var fileURL = URL.createObjectURL( blob );
            a.href = fileURL;
            a.download = fileName;
            a.click();
            document.body.removeChild(a);
          }
          console.log(response);
        });
      } //end: downloadReport
    



    ngOnInit() {
        this.isPopupVisible = false;
        this.reportManagementService.getAllReportsAndUnitConfig().subscribe((response) => {
            var temp_data = response;
            var index = 1;
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
            debugger;
            this.reportListData = temp_data;
        },
            (error) => {
                this.isVisible = false;
            });
    }//end:ngOnInit

}//end:class-ReportManagementListComponent    