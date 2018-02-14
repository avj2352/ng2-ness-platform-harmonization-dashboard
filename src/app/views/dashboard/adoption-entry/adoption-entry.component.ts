import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { AgGridConfigureService } from './../../../services/ag-grid-configure/ag-grid-configure.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Router } from '@angular/router';
//Comp
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';
import { AdoptionEditor } from 'app/components/agGridRenderer/ag-grid-editor.component';
import * as envConfig from 'app/services/constants/env.endpoints';

//Serveice 
import { AdoptionService } from 'app/services/adoption-service/adoption.service';
import { LogoutService } from 'app/services/auth/logout.service';

//Models 
import { UnitType } from '../models/unitType';
import { single } from 'rxjs/operators/single';
import { UnitTypeModel } from 'app/views/dashboard/models/unitTypeModel';
import { AgGrid } from 'app/views/dashboard/models/ag-grid';
import { AdoptionResult } from '../../../models/adoptionResult';
import { platform } from 'os';
import { LoginService } from 'app/services/auth/login.service';
import { ErrorModel } from '../models/errorModel';
import { ConfirmModel } from '../models/confirmModel';
import { AlertModel } from '../models/alertModel';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-adoption-entry',
  templateUrl: './adoption-entry.component.html',
  styleUrls: ['./adoption-entry.component.scss']
})
export class AdoptionEntryComponent implements OnInit {

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

  private displayData = false;
  private unitIndex;
  private errorModel: ErrorModel;
  private selectedReportName: string;
  private confirmModel: ConfirmModel;
  private alertModel: AlertModel;
  private adoptionUnitTableData: any;
  private loadingContent: string;
  private unitList: any;
  private errorBoolean: boolean;
  private isBreadCrumbVisible: boolean;
  private isPopupErrorVisible: boolean;
  private isPopupConfirmVisible: boolean;
  private userEmail: boolean;
  private showSubmit: boolean;
  private isPopupAlertVisible: boolean;
  private adoptionTable: boolean;
  private isVisible: boolean;
  private isLocked:boolean
  private isPopupMessageVisible: boolean;


  constructor(
    private staticDataService: StaticDataService,
    private agGridConfigureService: AgGridConfigureService,
    private adoptionService: AdoptionService,
    private router: Router,
    private logOutService: LogoutService,
    private logInService: LoginService
  ) {

  }//end:constructor

  configAgGridStyle() {
    let styles = {
      'width': '100%',
      'height': '65vh'
    };
    return styles;
  }//end:configAgGridStyle()

  adoptionChangeHandler(eventData: any) {
    this.adpotionResult = new AdoptionResult();
    let rowIndex = eventData.rowIndex;
    let key = this.productMap.get(eventData.data.productName) + eventData.column.colId + 'unit' + this.selectedUnitTypeID;
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
    this.createCurrentAgDataSelection(rowIndex, this.adpotionResult.assetId);
    //this.resultsMap() 
    // console.log(this.adoptionResultMap);
  } //end: adoptionChangeHandler

  getTheUnitList(unitTypeId){
    let unitList;
    for(var i = 0 ; i < this.unitTypes.length; i++){
      if(unitTypeId== this.unitTypes[i].id){
       unitList  =  this.unitTypes[i].unitList;
      }
   }
   return unitList;
  }

  getUnitColor(unitCode,unitList) {
    var clasStr;
    for(var k = 0 ; k < unitList.length; k++){
      if(unitCode == unitList[k].code){
        clasStr = unitList[k].colorCode;
        //return;
       // console.log(unitList[k].colorCode+"Colr"+unitList[k].code);
      }
   }
   return clasStr;
  }
  cellClickEvent(agGridData) {
    let rowIndex = agGridData.rowIndex;
    let cellData = agGridData.value;
    let assetId = cellData.assetId;
    this.createCurrentAgDataSelection(rowIndex,assetId);
    console.log('assetId='+ assetId + 'row='+ rowIndex+ 'cellData='+ cellData);
  }//end : onCellClicked

  createCurrentAgDataSelection(rowIndex,assetId) {
   // assetAdoptionData
   this.adoptionUnitTableData = [];
   // Data of all the KPI 
   for (let unitData of Array.from(this.assetAdoptionData.entries())) {
      let assetData = unitData[1].productAssetAdoptionResponse[rowIndex]
      let unitList = this.getTheUnitList(unitData[1].unitTypeId);
      console.log(unitList);
      let unitTableData = { 'value':'', 'class':''};
      if(assetData.assetDetails.length > 1){
        for(let i = 0; i < assetData.assetDetails.length; i++){
          let singleAsset = assetData.assetDetails[i];
          //unitTypeId
          if(singleAsset.assetId == assetId ){
             if(singleAsset.unitType === 'text'){
              unitTableData.value = singleAsset.unitValue;
              unitTableData.class = singleAsset.colorCode;
             }
             else {
              unitTableData.value = singleAsset.unitCode;              
              unitTableData.class = this.getUnitColor(singleAsset.unitCode, unitList);
              //console.log(singleAsset);
              //console.log(unitTableData);
             }
             this.adoptionUnitTableData.push(unitTableData);
          }
        }
      }
    }
    this.adoptionTable = true;
  } //end:createCurrentAgDataSelection

  //Click Save Handler
  onSaveReport() {
    this.loadingContent = 'Saving';
    this.confirmModel.content = envConfig.globalMessage.saveMessage;
    this.confirmModel.title = "Save Report";
    this.confirmModel.type = "save";
    this.isPopupConfirmVisible = true;
   
  } //End:onSaveReport

  disableLoader(){
    this.isVisible = false;
  }
  enableLoader() {
    this.isVisible = true;
  }

  onPopupConfirmOk(eventData: string) {
    this.isPopupConfirmVisible = false;
    switch (eventData) {
      case "submit": {
        let data = Array.from(this.adoptionResultMap.values());
    
        if (data) {
          this.adoptionService.submitReport(this.selectedReportId, data).subscribe(response => {
            if (response.status >= 400) {
              console.log(JSON.parse(response._body));
              let errorResp = JSON.parse(response._body);
              this.isPopupErrorVisible = true;
              this.errorMsg = response.response.specificMessage;
              this.errorBoolean = true;
              this.errorModel.title = 'Error'
              this.errorModel.content = 'Error on Service,' + this.errorMsg + 'Please try again'
              this.errorModel.button1 = 'logOut';
              this.errorModel.button2 = 'Cancel';
    
            }
            else {
              this.confirmModel.title ='Success';
              this.confirmModel.content = 'Successfully submitted the report';
              this.isPopupMessageVisible = true;
              this.confirmModel.type = 'submit';

            }
          },
            (error) => {  });
        }
      } break;
      case "save": {
        let data = Array.from(this.adoptionResultMap.values());
        if (data.length >= 1) {
          console.log("Save Report");
          console.log(data);
          setTimeout( () =>{
            this.adoptionService.saveReport(this.selectedReportId, data).subscribe(response => {
              if(this.exeptionHandling(response)){
               this.confirmModel.title ='Success';
               this.confirmModel.content = 'Data saved successfully';
               this.isPopupMessageVisible = true;
               this.confirmModel.type = 'saveReport';
              }
             },
               (error) => { this.isVisible = false });
          },100);
 
        }
        else{
          this.alertModel.content ="Nothing to save the data";
          this.isPopupAlertVisible = false;

        }
      }; break;
    }
   
  }//end:onPopupConfirmClose

  exeptionHandling(response){
    if (response.status === 401 ) {
      this.alertModel.content = "Authentication Error  ";
      this.isPopupAlertVisible = true;
      setTimeout(() =>{
        this.router.navigateByUrl('/login');
      },1000);
      return false;
    } 
    else if(response.status !== 401 && response.status !== 200 ){
      console.log("Error other than 401")
      console.log(JSON.parse(response._body));
      let errorResp ;
      if(response._body){
        errorResp =  JSON.parse(response._body);
      }
      this.alertModel.content = "Error in Entry Page."+ " Please try to enter the data" ;
      this.isPopupAlertVisible = true;
      return false;
    }
    else if(response.status === 200){
      return true;
    }
    return false;

  }
  confirmMessagePopup(eventData: string) {
    if(eventData == 'submit'){
      if(this.logInService.getSelectedRole().id === envConfig.premssionEnum.BG){
        this.router.navigateByUrl('/dashboard/'+ envConfig.routerURL.Adoption_View);
     }
     else {
       this.router.navigateByUrl('/dashboard/'+ envConfig.routerURL.Report_Management);
     }
    }
    else if(eventData == 'saveReport'){
      this.isPopupMessageVisible = false;
      window.location.reload();     
    }

  }
  onPopupConfirmCancel(eventData: boolean) {
    this.isPopupConfirmVisible = eventData;
  }//end:onPopupConfirmCancel

  onPopupAlertCancel(eventData: boolean) {
    this.isPopupAlertVisible = eventData;
    this.isPopupMessageVisible = eventData;

  }
  onSubitReport() {
    this.confirmModel.content = envConfig.globalMessage.submitMessage;
    this.confirmModel.title = "submit";
    this.confirmModel.type = "submit";
    this.isPopupConfirmVisible = true;
  }

  initiatelockScreen() {
    this.adoptionService.initiateLockReport().subscribe(response => {
      console.log(response);
    })
  }

  releaseLockReport() { 
    this.adoptionService.releaseLockReport(this.selectedReportId).subscribe(response => {
       console.log(response);
    })
  }
  getByUnitTypeReport() {
    this.enableLoader();
    this.adoptionService.getAllUnitsReport().subscribe( async response => {
      if (response.status >= 400) {
        let errorResp = JSON.parse(response._body);
        this.isVisible = false
        this.alertModel.content = errorResp.specificMessage;
        this.isPopupAlertVisible = true;
       // this.errorMsg = errorResp.specificMessage;
        this.errorBoolean = true;
        if (response.status === 401) {
          this.isPopupErrorVisible = true;
          this.router.navigateByUrl('/login');
        }
      }
      else {
        this.selectedReportId =await  response[0].productAssetAdoptionResponse[0].reportId;
        this.selectedReportName =await  response[0].productAssetAdoptionResponse[0].reportName;
        this.createProductMap(await response[0].productAssetAdoptionResponse);
        for (let singleUnit of response) {
          let unitType = this.unitTypeMap.get(singleUnit.unitTypeId);
          this.assetAdoptionData.set(singleUnit.unitTypeId, singleUnit);
        }
        // By default 1st unit
        this.selectedUnitTypeID = this.unitTypes[0].id;
        this.unitList = this.unitTypes[0].unitList;
        console.log(this.unitList);
        this.unitIndex = this.getUnitKey(this.selectedUnitTypeID);
        this.unitTypesDisplay[this.unitIndex].display = true;
        //this.selectedUnitTypeID = this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse[0].reportId;
        console.log(this.assetAdoptionData.get(this.selectedUnitTypeID));
        this.reportUnitTypeArray.set(this.selectedUnitTypeID,
          this.agGridConfigureService.getReportArray(this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse,
            this.unitTypes,
            this.unitTypes[0],
            false,
            this.userEmail)
        );
        this.frameworkComponents = { adoptionRenderer: AssetRenderer, adoptionEditor: AdoptionEditor };
        this.agGridData = this.reportUnitTypeArray.get(this.selectedUnitTypeID);
        this.displayData = true;
        this.disableLoader();
        //this.unitTypes[this.unitTypeMap.get(this.selectedUnitTypeID)].display = true;
        //this.columnDefs = this.reportUnitTypeArray.get(1).columnDefs;
      }

    },
      (error) => {

        this.errorModel.content = 'Error on Service, Please try again'
        this.isPopupErrorVisible = true;
        this.disableLoader();
      });

  }//end: getByUnitTypeReport

  createProductMap(data: any) {
    for (let productData of data) {
      this.productMap.set(productData.productName, productData.productId);
    }
  }

  //getKey 
  getUnitKey(value) {
    var ret = -1;
    //console.log("valye"+ value);
    for (let i = 0; i < this.unitTypesDisplay.length; i++) {
      let singleUnit = this.unitTypesDisplay[i];
      if (singleUnit.id == value) {
        ret = i;
      }
    }
    return ret;

  }
  //

  // On change the unit type 
  setDisplayAdoptionByUnit(unit: UnitType) {
    console.log(unit);
    //disabling;
    this.adoptionTable = false;
    this.adoptionUnitTableData = [];
    this.displayData = false;
    this.agGridData = new AgGrid();
    this.unitTypesDisplay[this.unitIndex].display = false;
    this.selectedUnitTypeID = unit.id;
    this.unitIndex = this.getUnitKey(unit.id);
    this.unitList = null;
    this.unitList = this.unitTypes[this.unitIndex].unitList;
    this.reportUnitTypeArray.set(this.selectedUnitTypeID,
      this.agGridConfigureService.getReportArray(
        this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse,
        this.unitTypes,
        unit.id,
        false,
        this.userEmail));
    console.log(this.reportUnitTypeArray.get(unit.id));
    this.unitTypesDisplay[this.unitIndex].display = true;
    this.agGridData = this.reportUnitTypeArray.get(this.selectedUnitTypeID);
    this.displayData = true;
    // this.selectedUnitTypeID to be changed. 
  }

  onPopupErrorClose(eventData: boolean) {
    this.isPopupErrorVisible = eventData;
    if (!eventData) {
      this.logOutService.logOut().subscribe(response => {
        this.router.navigateByUrl('/login');
      })
      // this.router.navigateByUrl('/login');
    }
  }//end:onPopupInfoClose

  onPopupErrorCancel(eventData: boolean) {
    this.isPopupErrorVisible = eventData;
    console.log('Popup Info Component was Cancelled', eventData);
  }//end:onPopupInfoCancel

  ngOnDestroy() {
    console.log("on destory");
  }

  ngOnInit() {
    this.logInService.verifyAuthScreen(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
    this.logInService.sentData(envConfig.routerURL.Adoption_Entry);
    this.isVisible = true;
    this.loadingContent = 'Loading Adoption Entry';
    this.assetAdoptionData = new Map();
    this.reportUnitTypeArray = new Map();
    this.unitTypeMap = new Map();
    this.resultsMap = new Map();
    this.productMap = new Map();
    this.adoptionResultMap = new Map();
    this.errorBoolean = false;
    this.adoptionTable = false;
    this.isPopupMessageVisible = false;
    this.errorMsg = '';
    this.confirmModel = new ConfirmModel();
    this.isPopupConfirmVisible = false;
    this.alertModel = new AlertModel();
    //Alert
    this.isPopupAlertVisible = false;
    this.alertModel.title = 'Alert '
    this.alertModel.content = '';
    //Confirm
    this.confirmModel.title = 'Confirmation '

    this.userEmail = this.logInService.getUserEmail();
    let selectedRole = this.logInService.getSelectedRole();
    if (selectedRole.id in envConfig.premssionEnum) {
      this.showSubmit = true;
    }
    //Error Model
    this.errorModel = new ErrorModel();
    this.errorModel.title = 'Error Popup'
    this.errorModel.button1 = 'logOut';
    this.errorModel.button2 = 'Cancel';
    this.adoptionService.geUnitType().subscribe(response => {
      this.unitTypes = response;
      if (response.status >= 400) {
        if (response.status === 500) {
          this.isPopupErrorVisible = true;
          this.errorBoolean = true;
          this.errorModel.title = 'Error'
          this.errorModel.content = 'Something went wrong,500 Error.Please try again'
          this.errorModel.button1 = 'logOut';
          this.errorModel.button2 = 'Cancel';
          return;
        }
        else if (response.status === 401) {
          this.isPopupErrorVisible = true;
          this.router.navigateByUrl('/login');
        }
        let errorResp = JSON.parse(response._body);
        this.isVisible = false
        this.errorMsg = errorResp.specificMessage;
        this.errorBoolean = true;
        this.alertModel.content = errorResp.specificMessage;
        //this.isPopupAlertVisible = true;

      }
      else {
        for (let singleUnit of this.unitTypes) {
          // console.log(typeof(singleUnit.code));
          this.unitTypeMap.set(singleUnit.id, singleUnit);
          this.assetAdoptionData.set(singleUnit.id, []);
          this.reportUnitTypeArray.set(singleUnit.id, []);
        }
        for (let singleUnit of this.unitTypes) {
          // console.log(typeof(singleUnit.code));
          let singleDisplay = new UnitType();
          singleDisplay = singleUnit;
          singleDisplay.display = false;
          this.unitTypesDisplay.push(singleDisplay);
        }
        console.log(this.unitTypesDisplay);
        this.getByUnitTypeReport();
        this.staticDataService.threeSecondDelay().then(response => {this.isVisible = false; }, (error) => {
            this.isVisible = false;
          });
        this.isBreadCrumbVisible = true;
      }
    },
      (error) => {
        this.errorModel.title = 'Error'
        this.errorModel.content = 'Error on Service, Please try again'
        this.errorModel.button1 = 'logOut';
        this.errorModel.button2 = 'Cancel';
        this.isPopupErrorVisible = true;
        this.isVisible = false
      });

  }//end:ngOnInit

}
