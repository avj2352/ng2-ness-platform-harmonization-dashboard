import { Component, OnInit, Input, Output, EventEmitter ,TemplateRef } from '@angular/core';

@Component({
  selector: 'phd-pop-up-confirm',
  templateUrl: './pop-up-confirm.component.html',
  styleUrls: ['./pop-up-confirm.component.scss']
})
export class PopUpConfirmComponent implements OnInit {

  @Input() visible:boolean;
  @Input() content:String;
  @Input() title:String;
  @Input() type:String;
  
  @Output() confirmOkPopup:EventEmitter<String>;
  @Output() cancelPopup:EventEmitter<boolean>;

  constructor() { 
    this.confirmOkPopup = new EventEmitter<String>();
    this.cancelPopup = new EventEmitter<boolean>();
  }//end:constructor

  confirm(){
    this.confirmOkPopup.emit(this.type);
  }//end:close

  cancel(){
    this.cancelPopup.emit(false);
  }//end:cancel

  ngOnInit() {
    
  }//end:ngOnInit

}
