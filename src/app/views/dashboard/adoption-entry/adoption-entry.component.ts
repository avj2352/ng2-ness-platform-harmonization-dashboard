import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
@Component({
  selector: 'app-adoption-entry',
  templateUrl: './adoption-entry.component.html',
  styleUrls: ['./adoption-entry.component.scss']
})
export class AdoptionEntryComponent implements OnInit {
  private columnDefs:any;
  private isBreadCrumbVisible:boolean;
  private rowData:any;  
  private isVisible:boolean;
  constructor(
    private staticDataService:StaticDataService
  ) {
    this.columnDefs = [
      {headerName: "Make", field: "make"},
      {headerName: "Model", field: "model"},
      {headerName: "Price", field: "price"}
    ];
    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
    ];
  }//end:constructor

  configAgGridStyle(){
    let styles = {
      'width':'100%',
      'height':'420px'
    };
    return styles;
  }//end:configAgGridStyle()

  ngOnInit() {
    this.isBreadCrumbVisible = true;
    this.isVisible = true;
    this.staticDataService.getStaticDelay().subscribe((response) => {this.isVisible = false},(error)=>{this.isVisible = false});
  }//end:ngOnInit

}
