import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ManagePlatformService } from './../../../../services/dashboard/manage-platform.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
  private isVisible:boolean;
  private pageTitle:any;
  private checkboxModel:any;
  private platformObj:any;
  constructor(
    private managePlatformService:ManagePlatformService,
    private route:ActivatedRoute
  ) {
    this.pageTitle="Create new Organization";
    this.checkboxModel = {
        value: 'true',
    };
    this.platformObj={
        code:'',
        name:'',
        hierarchy:'',
        description:''
    }

  }//end:constructor
  ngOnInit() {
    //Route
    // this.route.params.subscribe(params=>{
    //   console.log('Param are',params);
    // });

    
    var a=1;
    var b=2;
    this.isVisible = true;
  }//end:ngOnInit

  createPlatformAction(des){
    var a=1;
    var b=2;

    // this.router.navigateByUrl('/dashboard/createPlatform');
  }//end:showManagePlatform()

}//end:class-CreateOrganizationComponent
