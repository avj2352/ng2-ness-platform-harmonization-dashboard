import { Component, OnInit } from '@angular/core';
import { ReportManagementService } from 'app/services/dashboard/report-management.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';


@Component({
    selector:'phd-create-report',
    templateUrl:'./create-report.component.html',
    styleUrls:['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
    private isVisible:boolean;
    private organizationTypeListData:ManageHierarchy[];
    private selectOrg:ManageHierarchy;
    private organizationListData:ManageHierarchy[];
    private listofQuarter:any;
    private checkboxSelectedItems:any;
    private obj:any;
    constructor (
        private reportManagementService:ReportManagementService
    ){

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

    createReportAction(obj){
        alert("result "+obj.name);
    }

    ngOnInit(){
        var quarterYear = this.quarteroftheYear(new Date());
        var year = new Date().getFullYear()
        this.listofQuarter = this.getListOfQuarter(quarterYear, year);
        // alert(vm.listofQuarter)
        this.reportManagementService.getallUnitTypes().subscribe((response) => {
           // console.log('Response from GetAllOrganziation is: ', response);
           // this.organizationTypeListData= response; 
           var allArrayList = response;
           var listArrayTemp=[];
           allArrayList.forEach(sectorArray);
           function sectorArray(item) {
               listArrayTemp.push(item.id)
           }
           this.checkboxSelectedItems=listArrayTemp; 
           console.log("list of all checkbox : "+listArrayTemp)
        },
        (error)=>{
        this.isVisible = false;
        }); 

        this.obj={
            name:''
        }
    }//end:ngOnInit
}//end:CreateReportComponent