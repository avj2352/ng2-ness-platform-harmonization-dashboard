import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute ,Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Component({
  selector: 'app-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.scss']
})
export class ManageOrganizationComponent implements OnInit {
  private isVisible:boolean;
  private isBreadCrumbVisible:boolean;
  private activeTab:number
  constructor(
    private staticDataService:StaticDataService,
    private route:ActivatedRoute,
    private router:Router,
    private logInService: LoginService
  ) { 
  }//end:constructor

  showAddNewOrganization(){
    this.activeTab = 1;
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Organizations+'/create');
  }//end:showAddNewOrgazniation()

  showOrganizationlist(){
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Organizations+'/list');
  }//end:showAddNewOrgazniation()
  
  ngOnInit() {
    this.activeTab = 0;
    this.logInService.sentData(envConfig.routerURL.Manage_Organizations);
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Organizations+'/list');
    if(envConfig.routerURL.Manage_Organizations !== this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_Organizations)){
      this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_Organizations));
    }    
    this.isBreadCrumbVisible = true;
    this.isVisible = false;

  }//end:ngOnInit
}//end:ManageOrganizationComponent
