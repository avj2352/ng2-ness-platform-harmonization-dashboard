import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  private isVisible:boolean;
  private isPopupVisible:boolean;
  

  constructor(
    private router: Router
  ) {    
    this.isVisible = false;
    this.isPopupVisible = false;

   
  }//end:constructer

  onPopupInfoClose(eventData:boolean){
    this.isPopupVisible = eventData;
    if(!eventData){
      this.router.navigateByUrl('/login');
    }    
  }//end:onPopupInfoClose

  onPopupInfoCancel(eventData:boolean){
    this.isPopupVisible = eventData;
    console.log('Popup Info Component was Cancelled', eventData);
  }//end:onPopupInfoCancel

  logout(){
    this.isPopupVisible = true;
  }//end:logout

  showAdoptionEntry(){
    this.router.navigateByUrl('/dashboard/adoption-entry');
  }//end:showAdoptionEntry()

  showAdoptionView(){
    this.router.navigateByUrl('/dashboard/adoption-view');
  }//end:showAdoptionView()

  ngOnInit() {    
  }//end:ngOnInit  

}//end:class-DashboardComponent
