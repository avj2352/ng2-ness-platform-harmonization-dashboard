import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ReportManagementService } from 'app/services/dashboard/report-management.service';
import { Observable } from 'rxjs/Observable';

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

    constructor(
        private reportManagementService: ReportManagementService
    ) {
        // ng-smart-table settings        

    }//end:constructor

    ngOnInit() {
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
            this.reportListData  = temp_data;
            this.settings = {
                actions: {
                    edit: false,
                    add: false,
                    position: 'right',
                    custom: [
                        {
                            name: 'edit',
                            title: 'Edit ',
                        },
                    ],
                },
                delete: {
                    confirmDelete: true,
                },
                columns: {
                    index: {
                        title: '#'
                    },
                    name: {
                        title: ' Name'
                    },
                    quarterYear: {
                        title: 'Quarter of the year'
                    },
                    status: {
                        title: 'Status'
                    },
                }
            };//end:settings
        },
            (error) => {
                this.isVisible  =  false;
            });
    }//end:ngOnInit

}//end:class-ReportManagementListComponent    