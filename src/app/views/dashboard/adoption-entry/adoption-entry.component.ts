import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
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
import { AdoptionResult } from '../../../models/adoptionResult';
import { platform } from 'os';

@Component({
  selector: 'app-adoption-entry',
  templateUrl: './adoption-entry.component.html',
  styleUrls: ['./adoption-entry.component.scss']
})
export class AdoptionEntryComponent implements OnInit {

  private isVisible: boolean;
  private unitTypes: Array<UnitType>;
  private unitTypesDisplay: Array<UnitType> = [];
  private agGridData: AgGrid;
  private unitTypeMap;
  private assetAdoptionData;
  private reportUnitTypeArray;
  private frameworkComponents;
  private resultsMap: any;
  private adoptionResultMap;
  private adpotionResult: AdoptionResult;
  private selectedUnitTypeID: number;
  private selectedReportId: number;
  private productMap;
  private errorMsg: string;
  private errorBoolean: boolean;
  private isBreadCrumbVisible: boolean;
  private displayData = false;
  private displayMap;
  
  

  constructor(
    private staticDataService: StaticDataService,
    private agGridConfigureService: AgGridConfigureService,
    private adoptionService: AdoptionService
  ) {

  }//end:constructor

  configAgGridStyle() {
    let styles = {
      'width': '100%',
      'height': '420px'
    };
    return styles;
  }//end:configAgGridStyle()

  adoptionChangeHandler(eventData: any) {
    this.adpotionResult = new AdoptionResult();
    let key = this.productMap.get(eventData.data.productName) + eventData.column.colId;
    let unitListData = this.unitTypeMap.get(this.selectedUnitTypeID);
    if (unitListData.unitList.length > 0) {
      for (let unit of unitListData.unitList) {
        if (unit.code === eventData.newValue.unitCode) {
          this.adpotionResult.unitId = unit.id;
        }
      }

    }
    else {
      this.adpotionResult.unitValue = eventData.newValue.unitValue;
    }
    this.adpotionResult.productId = this.productMap.get(eventData.data.productName);
    this.adpotionResult.assetId = Number(eventData.column.colId.substring(5));
    this.adpotionResult.reportId = this.selectedReportId;
    this.adpotionResult.unitTypeId = this.selectedUnitTypeID;
    this.adoptionResultMap.set(key, this.adpotionResult);

    //this.resultsMap() 
    console.log(this.adoptionResultMap);
  }
  onCellClicked(event: any) {
    console.log(event);
  }

  //Click Save Handler
  onSaveReport() {
    let data = Array.from(this.adoptionResultMap.values());
    if (data) {
      this.adoptionService.saveReport(this.selectedReportId, data).subscribe(response => {
        console.log(response);
        window.location.reload();        
      },
        (error) => { this.isVisible = false });
    }

  } //End:onSaveReport

  onSubitReport() {
    let data = Array.from(this.adoptionResultMap.values());
    if (data) {
      this.adoptionService.submitReport(this.selectedReportId, data).subscribe(response => {
        console.log(response);
        window.location.reload();

      },
        (error) => { this.isVisible = false });
    }

  }

  ngOnInit() {
    this.isVisible = true;
    this.assetAdoptionData = new Map();
    this.reportUnitTypeArray = new Map();
    this.unitTypeMap = new Map();
    this.resultsMap = new Map();
    this.productMap = new Map();
    this.adoptionResultMap = new Map();
    this.displayMap = new Map();
    this.errorBoolean = false;
    this.staticDataService.threeSecondDelay().then((response) => { this.isVisible = false }, (error) => { this.isVisible = false });
    this.adoptionService.geUnitType().subscribe(response => {
      this.unitTypes = response;
      for (let singleUnit of this.unitTypes) {
        // console.log(typeof(singleUnit.code));
        this.unitTypeMap.set(singleUnit.id, singleUnit);
        this.assetAdoptionData.set(singleUnit.id, []);
        this.reportUnitTypeArray.set(singleUnit.id, []);
        this.displayMap.set(singleUnit.id, false);
      }
      for (let singleUnit of this.unitTypes) {
        // console.log(typeof(singleUnit.code));
        let  singleDisplay = new UnitType();
        singleDisplay = singleUnit;
        singleDisplay.display = false;
        this.unitTypesDisplay.push(singleDisplay); 
      }
      console.log(this.unitTypesDisplay);
      this.getByUnitTypeReport();
      this.isBreadCrumbVisible = true;

    },
      (error) => { this.isVisible = false });

  }//end:ngOnInit



  getByUnitTypeReport() {
    this.adoptionService.getAllUnitsReport().subscribe(response => {
      console.log(response);
      if (response.status === 400) {
        console.log(JSON.parse(response._body));
        let errorResp = JSON.parse(response._body);
        this.errorMsg = errorResp.specificMessage;
        this.errorBoolean = true;
      }
      else {
        console.log(response[0].productAssetAdoptionResponse[0]);        
        this.selectedReportId = response[0].productAssetAdoptionResponse[0].reportId;
        this.createProductMap(response[0].productAssetAdoptionResponse);
        for (let singleUnit of response) {
          let unitType = this.unitTypeMap.get(singleUnit.unitTypeId);
          this.assetAdoptionData.set(singleUnit.unitTypeId, singleUnit);
        }
        // By default 1st unit
        this.selectedUnitTypeID = this.unitTypes[0].id;

        //this.selectedUnitTypeID = this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse[0].reportId;
        console.log(this.selectedReportId);
        this.reportUnitTypeArray.set(this.selectedUnitTypeID, this.agGridConfigureService.getReportArray(this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse, this.unitTypes, this.unitTypes[0], false));
        this.frameworkComponents = { adoptionRenderer: AssetRenderer, adoptionEditor: AdoptionEditor };
        this.agGridData = this.reportUnitTypeArray.get(this.selectedUnitTypeID);
        this.displayMap.set(this.selectedUnitTypeID,true);
        let unitIndex = this.getUnitKey(this.selectedUnitTypeID); 
        this.unitTypesDisplay[unitIndex].display = true;
        this.displayData = true;

        console.log(this.unitTypes);
        //this.unitTypes[this.unitTypeMap.get(this.selectedUnitTypeID)].display = true;
        console.log(this.agGridData);
        //this.columnDefs = this.reportUnitTypeArray.get(1).columnDefs;
      }

    },
      (error) => {
        console.log(error);
        this.errorMsg = error;
        this.errorBoolean = true;
        this.isVisible = false
      });

  }//end: getByUnitTypeReport

  createProductMap(data: any) {
    for (let productData of data) {
      this.productMap.set(productData.productName, productData.productId);
    }
  }

//getKey 
 getUnitKey (value) {
			var ret = -1;
      //console.log("valye"+ value);
      for( let i = 0 ; i < this.unitTypesDisplay.length ; i++ ) {
         let singleUnit = this.unitTypesDisplay[i];
         if(singleUnit.id == value) {
            ret = i;
         }
      }
      return ret;
			
  }
  //
  checkUnit(unitId) {
      if(this.selectedUnitTypeID === unitId && this.displayMap.get(unitId) ) {
        console.log("this is how" + this.selectedUnitTypeID + "====" + unitId);
        return true;
      }
     return false;
  }

  // On change the unit type 
  setDisplayAdoptionByUnit(unit:UnitType) {
    console.log(unit);
    this.displayData = false;
    this.agGridData  = new AgGrid();
    this.selectedUnitTypeID = unit.id;
    this.displayMap.forEach((value: boolean, key: string) => {
      
  });
    this.reportUnitTypeArray.set(this.selectedUnitTypeID, 
          this.agGridConfigureService.getReportArray(
                                                    this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse, 
                                                    this.unitTypes, 
                                                   unit.id, 
                                                    false));
      console.log(this.reportUnitTypeArray.get(unit.id));
      this.agGridData = this.reportUnitTypeArray.get(this.selectedUnitTypeID);
      this.displayData = true;
    // this.selectedUnitTypeID to be changed. 
  }
  ngOnDestroy() {
    console.log("on destory");
  }

}
