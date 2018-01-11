import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'phd-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
@Input() content:string;
@Input() visible:boolean;

  constructor() { 

  }//end:constructor

  ngOnInit() {
  }//end:ngOnInit

}//end:class-LoaderComponent
