import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute ,Router } from '@angular/router';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss']
})
export class ReportManagementComponent implements OnInit {
  private isVisible:boolean;
  private isBreadCrumbVisible:boolean;
  constructor(
    private staticDataService:StaticDataService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
  }//end:constructor

  showAddNewReport(){
    this.router.navigateByUrl('/dashboard/report-management/create');
  }//end:showAddNewOrgazniation()

  showReportlist(){
    this.router.navigateByUrl('/dashboard/report-management/list');
  }//end:showAddNewOrgazniation()

  ngOnInit() {
    this.isBreadCrumbVisible = true;
    this.route.params.subscribe(params=>{
      console.log('Param are',params);
    });
    this.isVisible = true;
    //Service related
    this.staticDataService.threeSecondDelay().then((response) => {
      this.isVisible = false;      
    },
    (error)=>{
      this.isVisible = false;
    });
  }//end:ngOnInit

}//end:ReportManagementComponent
