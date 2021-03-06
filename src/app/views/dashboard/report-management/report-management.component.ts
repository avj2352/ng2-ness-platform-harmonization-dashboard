import { Component, OnInit ,Output, EventEmitter } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute ,Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';
import { OnChanges, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss']
})
export class ReportManagementComponent implements OnInit, DoCheck {
  private isVisible:boolean;
  private isBreadCrumbVisible:boolean;
  private activeTab:number;
  @Output() selectedDashboardScreen:EventEmitter<string>; 
  constructor(
    private staticDataService:StaticDataService,
    private route:ActivatedRoute,
    private router:Router, 
    private logInService: LoginService
   
  ) {     
    this.selectedDashboardScreen = new EventEmitter<string>();
  }//end:constructor

  showAddNewReport(){
    this.staticDataService.switchReportTab(1);
    this.router.navigateByUrl('/dashboard/' +envConfig.routerURL.Report_Management+'/create');
  }//end:showAddNewOrgazniation()

  showReportlist(){
    this.staticDataService.switchReportTab(0);
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Report_Management+'/list');
  }//end:showAddNewOrgazniation()

  ngDoCheck(){
    this.staticDataService.activeTab$.subscribe(res=>{
      this.activeTab = res;
    });//end:subscribe for tab change
  }//end:ngOnChanges

  ngOnInit() {    
    let selectedScreen;
    this.activeTab = 0;
    this.logInService.currentData.subscribe(message =>
      selectedScreen = message);
    // if(envConfig.routerURL.Report_Management !== this.logInService.verifyAuthScreen(envConfig.routerURL.Report_Management)){
    //   this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Report_Management));
    // }
    this.selectedDashboardScreen.emit(envConfig.routerURL.Report_Management);
    this.logInService.sentData(envConfig.routerURL.Report_Management);
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Report_Management+'/list');
    this.isBreadCrumbVisible = true;
    this.isVisible = false;

  }//end:ngOnInit

}//end:ReportManagementComponent
