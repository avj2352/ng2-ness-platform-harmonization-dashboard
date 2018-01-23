import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'phd-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input() private visible:boolean;
  constructor(

  ) {

  }

  ngOnInit() {
  }//end:ngOnInit

}//end:class-BreadCrumbComponent
