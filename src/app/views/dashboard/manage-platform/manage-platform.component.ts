import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';

@Component({
  selector: 'app-manage-platform',
  templateUrl: './manage-platform.component.html',
  styleUrls: ['./manage-platform.component.scss']
})
export class ManagePlatformComponent implements OnInit {
  private isVisible:boolean;
  private isBreadCrumbVisible:boolean;
  private activeTab:number
  constructor(
    private route:ActivatedRoute,
    private router:Router,
      private logInService: LoginService
  ) { 
  }//end:constructor

  showAddNewPlatform(){
    this.activeTab = 1;
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Platform+'/create');
  }//end:showAddNewOrgazniation()

  showPlatformlist(){
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Platform+'/list');
  }//end:showAddNewOrgazniation()
  
  ngOnInit() {
    this.activeTab = 0;
    this.logInService.sentData(envConfig.routerURL.Manage_Platform);
    this.router.navigateByUrl('/dashboard/'+envConfig.routerURL.Manage_Platform+'/list');
    if(envConfig.routerURL.Manage_Platform !== this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_Platform)){
      this.router.navigateByUrl('/dashboard/'+this.logInService.verifyAuthScreen(envConfig.routerURL.Manage_Platform));
    }   
    this.isBreadCrumbVisible = true;
    this.isVisible = false;
  }//end:ngOnInit
}//end:ManagePlatformComponent
