import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private isVisible:boolean;
  private isPopupVisible:boolean;


  constructor() { 

  }//end:constructer

  ngOnInit() {
    this.isVisible = false;
    this.isPopupVisible = false;
  }//end:ngOnInit

  logout(){
    this.isPopupVisible = true;
  }

}//end:class-DashboardComponent
