import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute } from '@angular/router';
import { AgGridConfigureService } from './../../../services/ag-grid-configure/ag-grid-configure.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
//Comp
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';
import { AdoptionEditor } from 'app/components/agGridRenderer/ag-grid-editor.component';

//Serveice 
import { AdoptionService } from 'app/services/adoption-service/adoption.service';

//Models 
import { UnitType } from '../models/unitType';
import { single } from 'rxjs/operators/single';
import { UnitTypeModel } from 'app/views/dashboard/models/unitTypeModel';
import { AgGrid } from 'app/views/dashboard/models/ag-grid';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-adoption-view',
  templateUrl: './adoption-view.component.html',
  styleUrls: ['./adoption-view.component.scss']
})
export class AdoptionViewComponent implements OnInit {
  private columnDefs: any;
  private rowData: any;
  private isVisible: boolean;
  private unitTypes: Array<UnitType>;
  private agGridData: AgGrid;
  private unitTypeMap;
  private assetAdoptionData;
  private reportUnitTypeArray;
  private frameworkComponents;
  private allReportArray: any;
  private selectedReport: any;

  constructor(
    private staticDataService: StaticDataService,
    private adoptionService: AdoptionService,
    private route: ActivatedRoute,
    private agGridConfigureService:AgGridConfigureService ) 
    {
    this.columnDefs = [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" }
    ];
    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
    this.adoptionService.getAllReportsAndUnitConfig().subscribe(response => {
      this.allReportArray = response;
      this.selectedReport = response[0];
    },
      (error) => { this.isVisible = false });
  }//end:constructor

  configAgGridStyle() {
    let styles = {
      'width': '100%',
      'height': '68vh'
    };
    return styles;
  }//end:configAgGridStyle()

  ngOnInit() {
    this.assetAdoptionData = new Map();
    this.reportUnitTypeArray = new Map();
    this.unitTypeMap = new Map();
    //Route
    this.route.params.subscribe(params => {
      console.log('Param are', params);
    });
    this.isVisible = true;
    //Service related
    this.staticDataService.threeSecondDelay().then((response) => {
      this.isVisible = false;
    },
      (error) => {
        this.isVisible = false;
      });

    // this.staticDataService.createMergeMapExample().subscribe(x=>console.log('Merge Map: ',x));
    // this.staticDataService.createSwitchMapExample().subscribe(x=>console.log('Switch Map', x));
  }//end:ngOnInit

  selectedReportView() {
    this.unitTypes = this.selectedReport.unitTypeList;
    for (let singleUnit of this.unitTypes) {
      // console.log(typeof(singleUnit.code));
      this.unitTypeMap.set(singleUnit.id, singleUnit);
      this.assetAdoptionData.set(singleUnit.id, []);
      this.reportUnitTypeArray.set(singleUnit.id, []);
    }
    this.getAllUnitsReportById()
  }

  downloadReport() {
    this.adoptionService.downloadReport(this.selectedReport.id).subscribe(response => {
      console.log(response);
    });
  }

  //On the load get the data of the configured units 
  getAllUnitsReportById() {
    this.adoptionService.getAllUnitsReportById(this.selectedReport.id).subscribe(response => {
      for(let singleUnit of response) { 
         let unitType =  this.unitTypeMap.get(singleUnit.unitTypeId);
         this.assetAdoptionData.set(singleUnit.unitTypeId,singleUnit); 
     }
     this.reportUnitTypeArray.set(this.unitTypes[0].id,this.agGridConfigureService.getReportArray(this.assetAdoptionData.get(this.unitTypes[0].id).productAssetAdoptionResponse,this.unitTypes,this.unitTypes[0],true));
     this.frameworkComponents = { adoptionRenderer: AssetRenderer, adoptionEditor : AdoptionEditor};   
     this.agGridData = this.reportUnitTypeArray.get(1);
   //this.columnDefs = this.reportUnitTypeArray.get(1).columnDefs;
    
    });
  }

}//end:class-AdoptionViewComponent
