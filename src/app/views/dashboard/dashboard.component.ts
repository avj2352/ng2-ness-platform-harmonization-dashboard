import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isVisible:boolean;

  constructor() { 

  }//end:constructer

  ngOnInit() {
    this.isVisible = false;
  }//end:ngOnInit

}//end:class-DashboardComponent
