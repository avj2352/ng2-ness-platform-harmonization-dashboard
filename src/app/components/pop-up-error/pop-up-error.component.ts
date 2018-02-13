import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'phd-pop-up-error',
  templateUrl: './pop-up-error.component.html',
  styleUrls: ['./pop-up-error.component.scss']
})
export class PopUpErrorComponent implements OnInit {

  @Input() visible:boolean;
  @Input() content:String;
  @Input() title:String;
  @Input() button1:String;
  @Input() button2:String;
  
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

}
