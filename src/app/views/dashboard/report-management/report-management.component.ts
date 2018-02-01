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
  private activeTab:number;

  constructor(
    private staticDataService:StaticDataService,
    private route:ActivatedRoute,
    private router:Router,    
  ) {     
  }//end:constructor

  showAddNewReport(){
    this.activeTab = 1;
    this.router.navigateByUrl('/dashboard/report-management/create');
  }//end:showAddNewOrgazniation()

  showReportlist(){
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/report-management/list');
  }//end:showAddNewOrgazniation()

  ngOnInit() {
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/report-management/list');
    this.isBreadCrumbVisible = true;
    this.isVisible = false;

  }//end:ngOnInit

}//end:ReportManagementComponent
