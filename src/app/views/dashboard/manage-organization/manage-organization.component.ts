import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.scss']
})
export class ManageOrganizationComponent implements OnInit {
  private isVisible:boolean;
  private isBreadCrumbVisible:boolean;
  constructor(
    private staticDataService:StaticDataService,
    private route:ActivatedRoute
  ) { 
  }//end:constructor

  ngOnInit() {
    this.isBreadCrumbVisible = true;
    this.route.params.subscribe(params=>{
      console.log('Param are',params);
    });
    this.isVisible = true;
    //Service related
    this.staticDataService.threeSecondDelay().then((response) => {
      this.isVisible = false;      
    },
    (error)=>{
      this.isVisible = false;
    });
  }//end:ngOnInit

}//end:ManageOrganizationComponent
