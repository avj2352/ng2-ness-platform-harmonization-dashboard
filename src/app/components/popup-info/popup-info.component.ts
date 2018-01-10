import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'phd-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss']
})
export class PopupInfoComponent implements OnInit {

  @Input() private visible:boolean;
  constructor() { 

  }//end:constructor

  ngOnInit() {
    
  }//end:ngOnInit

}//end:class-PopupInfoComponent
