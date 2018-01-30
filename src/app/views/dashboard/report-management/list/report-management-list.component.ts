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
    private isPopupVisible:boolean;
    private trackStatusDetails:any;

    constructor(
        private reportManagementService: ReportManagementService
    ) {
        // ng-smart-table settings        
        this.trackStatusDetails = null;
    }//end:constructor

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.reportManagementService.deleteReport(event.data.id).subscribe((response) => {
                console.log(response)   
              },
              (error)=>{
                console.log(error)   
                // this.isVisible = false;
              });
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      }//end:onDeleteConfirm

      onPopupInfoClose(event){
        console.log('Track Status Window closed');
        this.isPopupVisible = false;
      }//end:onPopupInfoClose

      viewReportItemStatus(item){
        this.isPopupVisible = true;
        this.trackStatusDetails = item;
      }//end:viewReportItemStatus

    ngOnInit() {
        this.isPopupVisible = false;
        this.reportManagementService.getAllReportsAndUnitConfig().subscribe((response)  =>  {
            var temp_data = response;
            var index=1;
            temp_data.forEach(item => {
                    var date = new Date(item.startDate);
                    var month = new Date(item.startDate).getMonth() + 1;
                    var quarterYearnumber = Math.ceil(month / 3);
                    var year = new Date(item.startDate).getFullYear();
                    var quarterYear = "Q" + quarterYearnumber + " " + year;
                    item.quarterYear = quarterYear;
                    item.index=index;
                    index+=1;
            });
            debugger;
            this.reportListData  = temp_data;            
        },
            (error) => {
                this.isVisible  =  false;
            });
    }//end:ngOnInit

}//end:class-ReportManagementListComponent    