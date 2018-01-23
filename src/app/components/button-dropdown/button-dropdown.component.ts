import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[phd-button-dropdown]',
  templateUrl: './button-dropdown.component.html',
  styleUrls: ['./button-dropdown.component.scss']
})
export class ButtonDropdownComponent implements OnInit {

  @Input() private visible:boolean;

  constructor() { 

  }//end:constructor

  ngOnInit() {
  }//end:ngOnInit

}//end:ButtonDropdownComponent
