import {UserRoleModel} from './../../models/user-role-model';
import {Component, OnInit, AfterContentInit, Inject} from '@angular/core';
import {LoaderComponent} from '../../components/loader/loader.component';
import {Router} from '@angular/router';
import {SideBarComponent} from './../../components/side-bar/side-bar.component';
import {ManageOrganizationService} from '../../services/dashboard/manage-organization.service';
import {ReportManagementService} from '../../services/dashboard/report-management.service';
import {ManagePlatformService} from '../../services/dashboard/manage-platform.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../../services/auth/token-interceptor.service';
import {LoginService} from '../../services/auth/login.service';
import {map as _map} from 'lodash';
import {LogoutService} from 'app/services/auth/logout.service';
import {ManageAssetCategoriesService} from '../../services/dashboard/manage-assetcategories.service';
import {ConfirmModel} from 'app/views/dashboard/models/confirmModel';
import { AlertModel } from 'app/views/dashboard/models/alertModel';

import { StorageService } from 'app/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    ManageOrganizationService,
    ReportManagementService,
    ManagePlatformService,
    ManageAssetCategoriesService
  ]
})
export class DashboardComponent implements OnInit {

  private isUserProfileDropdown : boolean;
  private isVisible : boolean;
  private isPopupVisible : boolean;
  private isSideBarVisible : boolean;
  private userRole : UserRoleModel;
  private screens : string[];
  private userName : string;
  private roleList : any;
  private selectedScreen : string;
  private confirmModel : ConfirmModel;
  private isPopupConfirmVisible : boolean;
  private roleChange : any;
  private popUpTitle : string;
  private alertModel: AlertModel;
  private isPopupAlertVisible: boolean;

  constructor(private router : Router, private storageService:StorageService, private loginService : LoginService, private logOutService : LogoutService, private reportManagementService : ReportManagementService,) {
    this.isVisible = false;
    this.isPopupVisible = false;

  } //end:constructer

  onPopupInfoClose(eventData : boolean) {
    this.isPopupVisible = eventData;
    if (!eventData) {
      this
        .logOutService
        .logOut()
        .subscribe(response => {
          this
            .router
            .navigateByUrl('/login');
        })
      // this.router.navigateByUrl('/login');
    }
  } //end:onPopupInfoClose

  onPopupInfoCancel(eventData : boolean) {
    this.isPopupVisible = eventData;
    console.log('Popup Info Component was Cancelled', eventData);
  } //end:onPopupInfoCancel

  logout() {
    this.isPopupVisible = true;

  } //end:logout

  toggleSideBar() {
    this.isSideBarVisible = !this.isSideBarVisible;
    console.log('Toggle Side Bar', this.isSideBarVisible);
  }

  // showAdoptionEntry(){   this.router.navigateByUrl('/dashboard/reportEdit');
  // }//end:showAdoptionEntry() showAdoptionView(){
  // this.router.navigateByUrl('/dashboard/quarterlyStatus');
  // }//end:showAdoptionView() showManageOrg(){
  // this.router.navigateByUrl('/dashboard/manage-organizations');
  // }//end:showManageOrg showManagePlatform(){
  // this.router.navigateByUrl('/dashboard/manage-platform');
  // }//end:showManagePlatform showReportManagement(){
  // this.router.navigateByUrl('/dashboard/report-management');
  // }//end:showReportManagement showManageAssetCategories(){
  // this.router.navigateByUrl('/dashboard/manage-assetCategories');
  // }//end:showManageAssetCategories

  toggleUserProfileDropdown() {
    this.isUserProfileDropdown = !this.isUserProfileDropdown;
  } //end:toggleUserProfileDropdown()

  showScreen(screen : string) {
    this.selectedScreen = screen;
    if(this.userRole.name != this.storageService.getSelectedRole().name){
      this.alertModel.content ="You are about to log off, Because you are aleady logged in with differnet role";
      this.isPopupAlertVisible = true;
    }
    let screenFormatted = screen.replace(/ /g, "_");
    this
      .router
      .navigateByUrl('/dashboard/' + screenFormatted);
    console.log(screenFormatted);
  } //end:showScreen
  onPopupAlertCancel(){
    this.router.navigateByUrl('/login');
  }
  setUserRole(role) {
    //Step1: Call popup Step2:
    this.roleChange = role;
    this.confirmModel.content = "Would you like to switch from your current role? Please save your pending change" +
        "s Click OK to continue."
    this.confirmModel.type = "roleChange";
    this.isPopupConfirmVisible = true;
    // this.isUserProfileDropdown = false;
    // let changeUserService = this.loginService.setRoleId(role);
    // changeUserService.subscribe(response => {
    //   console.log('Reloading');
    //   const defaultScreen = this.loginService.verifyAuthScreen({});
    //   this.router.navigateByUrl('/dashboard/' + defaultScreen);
    //   window.location.reload();
    //   });
  } //end:setUserRole

  onPopupConfirmCancel(eventData : string) {
    this.isUserProfileDropdown = false;
    this.isPopupConfirmVisible = false;
  } //end:onPopupConfirmCancel

  onPopupConfirmOk(eventData : string) {
    this.isPopupConfirmVisible = false;
    this.isUserProfileDropdown = false;
    this.loginService.setRoleId(this.roleChange).subscribe(response => {
        window.location.reload();
      })
  }//end:onPopupConfirmOk

  selectedDashboardScreen(screen) {
    console.log("screen " + screen)
    this.selectedScreen = screen;
  }

  ngOnChanges(){
    this.initPage();
  }//end:ngOnChanges

  ngOnInit() {
    this.initPage();
  } //end:ngOnInit

  initPage(){
    this.isSideBarVisible = false;
    this.isUserProfileDropdown = false;
    this.userName = this.storageService.getFullName();
    this.userRole = this.storageService.getSelectedRole();
    this.popUpTitle = "Do you want to log out?";
    this.screens = this.userRole.screens.map(screen => {
        return screen.replace('_', ' ');
      })

    this.alertModel = new AlertModel();
    this.isPopupAlertVisible = false;
    this.alertModel.title = 'Alert '
    this.roleList = this.loginService.getRoleList();
    this.confirmModel = new ConfirmModel();
    this.isPopupConfirmVisible = false;
    this.isPopupAlertVisible = false;
    this.confirmModel.title = 'Confirmation';

    this.router.navigateByUrl('/dashboard/' + this.userRole.screens[0]);
    this.selectedScreen = this.screens[0];
    this.loginService.currentData.subscribe(message => {
        console.log(message);
        if (message.length > 0) {
          this.selectedScreen = message.replace('_', ' ');
        }
      });
    //this.screens =  this.userRole.screens;
    console.log('Screens are: ', this.userRole.screens[0]);
    // this.manageOrg.getAllOrganizationTypeConfig().subscribe(res=>console.log('Get
    // All Organization response:', res));
  }//end:initPage

} //end:class-DashboardComponent