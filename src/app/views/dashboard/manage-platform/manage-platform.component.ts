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
  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) { 
  }//end:constructor

  showAddNewPlatform(){
    this.router.navigateByUrl('/dashboard/manage-platform/create');
  }//end:showAddNewOrgazniation()

  showPlatformlist(){
    this.router.navigateByUrl('/dashboard/manage-platform/list');
  }//end:showAddNewOrgazniation()
  
  ngOnInit() {
    this.isBreadCrumbVisible = true;
    this.isVisible = false;
  }//end:ngOnInit
}//end:ManagePlatformComponent
