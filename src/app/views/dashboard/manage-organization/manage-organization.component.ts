import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute ,Router } from '@angular/router';

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
    private router:Router
  ) { 
  }//end:constructor

  showAddNewOrganization(){
    this.activeTab = 1;
    this.router.navigateByUrl('/dashboard/manage-organizations/create');
  }//end:showAddNewOrgazniation()

  showOrganizationlist(){
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/manage-organizations/list');
  }//end:showAddNewOrgazniation()
  
  ngOnInit() {
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/manage-organizations/list');
    this.isBreadCrumbVisible = true;
    this.isVisible = false;

  }//end:ngOnInit
}//end:ManageOrganizationComponent
