import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';

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
    private router:Router
  ) { 
  }//end:constructor

  showAddNewPlatform(){
    this.activeTab = 1;
    this.router.navigateByUrl('/dashboard/manage-platform/create');
  }//end:showAddNewOrgazniation()

  showPlatformlist(){
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/manage-platform/list');
  }//end:showAddNewOrgazniation()
  
  ngOnInit() {
    this.activeTab = 0;
    this.router.navigateByUrl('/dashboard/manage-platform/list');
    this.isBreadCrumbVisible = true;
    this.isVisible = false;
  }//end:ngOnInit
}//end:ManagePlatformComponent
