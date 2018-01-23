import { UserRoleModel } from './../../models/user-role-model';
import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Router } from '@angular/router';
import { SideBarComponent } from './../../components/side-bar/side-bar.component';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { ManagePlatformService } from 'app/services/dashboard/manage-platform.service';
import { ReportManagementService } from 'app/services/dashboard/report-management.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'app/services/auth/token-interceptor.service';
import { LoginService } from 'app/services/auth/login.service';
import { map as _map } from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[
    ManageOrganizationService,
    ManagePlatformService,
    ReportManagementService,
    {
      provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
  ]
})
export class DashboardComponent implements OnInit {
  

  private isVisible:boolean;
  private isPopupVisible:boolean;
  private isSideBarVisible:boolean;
  private userRole:UserRoleModel;
  private screens:string[];
  private userName:string;

  constructor(
    private manageOrganizationService:ManageOrganizationService,
    private managePlatformService:ManagePlatformService,
    private reportManagementService:ReportManagementService,
    private router: Router,
    private loginService:LoginService
  ) {    
    this.isVisible = false;
    this.isPopupVisible = false;

   
  }//end:constructer

  onPopupInfoClose(eventData:boolean){
    this.isPopupVisible = eventData;
    if(!eventData){
      this.router.navigateByUrl('/login');
    }    
  }//end:onPopupInfoClose

  onPopupInfoCancel(eventData:boolean){
    this.isPopupVisible = eventData;
    console.log('Popup Info Component was Cancelled', eventData);
  }//end:onPopupInfoCancel

  logout(){
    this.isPopupVisible = true;
  }//end:logout

  toggleSideBar(){
    this.isSideBarVisible = !this.isSideBarVisible;
    console.log('Toggle Side Bar', this.isSideBarVisible);
  }

  showAdoptionEntry(){
    this.router.navigateByUrl('/dashboard/reportEdit');
  }//end:showAdoptionEntry()

  showAdoptionView(){
    this.router.navigateByUrl('/dashboard/quarterlyStatus');
  }//end:showAdoptionView()

  showManagePlatform(){
    this.router.navigateByUrl('/dashboard/managePlatform');
  }//end:showManagePlatform()

  showManageOrganization(){
    this.router.navigateByUrl('/dashboard/manageOrganization');
  }//end:showManageOrganization()

  showReportManagement(){
    this.router.navigateByUrl('/dashboard/reportManagement');
  }//end:showReportManagement()

  ngOnInit() { 
    this.isSideBarVisible = false;   
    this.userName = this.loginService.getUserName();
    this.userRole = this.loginService.getSelectedRole();        
    console.log('Screens are: ', this.userRole);
    // this.manageOrg.getAllOrganizationTypeConfig().subscribe(res=>console.log('Get All Organization response:', res));
  }//end:ngOnInit  

}//end:class-DashboardComponent
