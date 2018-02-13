import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'phd-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.scss']
})
export class PopUpMessageComponent implements OnInit {


  @Input() visible:boolean;
  @Input() content:String;
  @Input() title:String;
  @Input() type:String;
  
  @Output() confirmMessagePopup:EventEmitter<String>;

  constructor() { 
    this.confirmMessagePopup = new EventEmitter<String>();
  }//end:constructor

  confirm(){
    this.confirmMessagePopup.emit(this.type);
  }//end:close


  ngOnInit() {
    
  }//end:ngOnInit

}
