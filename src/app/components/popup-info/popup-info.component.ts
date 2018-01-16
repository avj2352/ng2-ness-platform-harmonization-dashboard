import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'phd-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})
export class PopupInfoComponent implements OnInit {

  @Input() visible:boolean;
  @Input() content:String;
  @Input() title:String;
  
  @Output() closePopup:EventEmitter<boolean>;
  @Output() cancelPopup:EventEmitter<boolean>;

  constructor() { 
    this.closePopup = new EventEmitter<boolean>();
    this.cancelPopup = new EventEmitter<boolean>();
  }//end:constructor

  close(){
    this.closePopup.emit(false);
  }//end:close

  cancel(){
    this.cancelPopup.emit(false);
  }//end:cancel

  ngOnInit() {
    
  }//end:ngOnInit

}//end:class-PopupInfoComponent
