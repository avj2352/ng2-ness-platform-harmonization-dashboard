import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import {AgGridConfigureService} from './../../../services/ag-grid-configure/ag-grid-configure.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

//Comp
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';

//Models 
import {UnitType} from '../models/unitType';
import { single } from 'rxjs/operators/single';
import { UnitTypeModel } from 'app/views/dashboard/models/unitTypeModel';
import {AgGrid} from 'app/views/dashboard/models/ag-grid';

@Component({
  selector: 'app-adoption-entry',
  templateUrl: './adoption-entry.component.html',
  styleUrls: ['./adoption-entry.component.scss']
})
export class AdoptionEntryComponent implements OnInit {
  private columnDefs:any;
  private rowData:any;  
  private isVisible:boolean;
  private unitTypes: Array<UnitType>;
  private agGridData: AgGrid;
  private unitTypeMap;
  private assetAdoptionData;
  private reportUnitTypeArray;
  private frameworkComponents;
  
  constructor(
    private staticDataService:StaticDataService,
    private agGridConfigureService:AgGridConfigureService
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
    this.isVisible = true;
    this.assetAdoptionData = new Map();
    this.reportUnitTypeArray = new Map();
    this.unitTypeMap = new Map();
    this.staticDataService.threeSecondDelay().then((response) => {this.isVisible = false},(error)=>{this.isVisible = false});
    this.staticDataService.geUnitType().subscribe(response => {
      this.unitTypes = response;
      for(let singleUnit of this.unitTypes) { 
         // console.log(typeof(singleUnit.code));
          this.unitTypeMap.set(singleUnit.id, singleUnit);
          this.assetAdoptionData.set(singleUnit.id , []);
          this.reportUnitTypeArray.set(singleUnit.id , []);
       }
       this.getByUnitTypeReport();
      // this.staticDataService.getAdoptionResult().subscribe(response => {
      //    console.log(this.agGridConfigureService.getReportArray(response[this.unitTypes[0].code].productAssetAdoptionResponse,this.unitTypes,this.unitTypes[0],false));
      // });
    },
    (error)=>
    {this.isVisible = false});
    
  }//end:ngOnInit

  getByUnitTypeReport() {
    this.staticDataService.getAdoptionResult().subscribe(response => {
      for(let singleUnit of response) { 
         let unitType =  this.unitTypeMap.get(singleUnit.unitTypeId);
         this.assetAdoptionData.set(singleUnit.unitTypeId,singleUnit);
     }
     this.reportUnitTypeArray.set(this.unitTypes[0].id,this.agGridConfigureService.getReportArray(this.assetAdoptionData.get(this.unitTypes[0].id).productAssetAdoptionResponse,this.unitTypes,this.unitTypes[0],false));
     this.frameworkComponents = { adoptionRenderer: AssetRenderer};   
     this.agGridData = this.reportUnitTypeArray.get(1);
    console.log(this.agGridData);
   //this.columnDefs = this.reportUnitTypeArray.get(1).columnDefs;
    
    });

  }

}
