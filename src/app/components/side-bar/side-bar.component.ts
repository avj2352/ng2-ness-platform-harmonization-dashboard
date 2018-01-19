import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'phd-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() visible:boolean;
  @Output() hidden:EventEmitter<boolean>;
 
  constructor() { 
    this.hidden = new EventEmitter<boolean>();
  }//end:constructor

  hideSideBar(){
    this.hidden.emit(false);
  }

  ngOnInit() {
    console.log('Value of visible ppty is: ', this.visible);
  }//end:ngOnInit

  

}//end:class-SideBarComponent
