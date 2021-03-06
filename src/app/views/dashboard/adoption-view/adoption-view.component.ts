import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute } from '@angular/router';
import { AgGridConfigureService } from './../../../services/ag-grid-configure/ag-grid-configure.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';

//Comp
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';
import { AdoptionEditor } from 'app/components/agGridRenderer/ag-grid-editor.component';

//Serveice 
import { AdoptionService } from 'app/services/adoption-service/adoption.service';
import { LogoutService } from 'app/services/auth/logout.service';
import { LoginService } from 'app/services/auth/login.service';


//Models 
import { UnitType } from '../models/unitType';
import { single } from 'rxjs/operators/single';
import { UnitTypeModel } from 'app/views/dashboard/models/unitTypeModel';
import { AgGrid } from 'app/views/dashboard/models/ag-grid';
import { Response } from '@angular/http/src/static_response';
import { ErrorModel } from '../models/errorModel';

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
  private unitTypesDisplay: Array<UnitType> = [];  
  private agGridData: AgGrid;
  private unitTypeMap;
  private assetAdoptionData;
  private reportUnitTypeArray;
  private frameworkComponents;
  private allReportArray: any = [];
  private selectedReport: any;
  private selectedUnitTypeID: number;  
  private displayData: boolean;
  private unitIndex;
  private errorModel: ErrorModel;
  private isPopupErrorVisible: boolean;
  

  constructor(
    private staticDataService: StaticDataService,
    private adoptionService: AdoptionService,
    private route: ActivatedRoute,
    private agGridConfigureService:AgGridConfigureService,
    private router: Router,
    private logOutService: LogoutService,
    private logInService: LoginService ) 
    {
    this.adoptionService.getAllReportsAndUnitConfig().subscribe(response => {
      console.log(response);
      this.allReportArray.push({'name':'Select Report','code':'Dummy'})
      if (response.status >= 400) {
         if (response.status === 401 ){
          this.isPopupErrorVisible = true;
          this.logOutService.logOut().subscribe( res => {
            this.router.navigateByUrl('/login');
          });
         }
        let errorResp = JSON.parse(response._body);
        this.isPopupErrorVisible = true;
        this.isVisible = false
        let errorMsg = errorResp.specificMessage;
        this.errorModel.content = 'Error on Service,' + errorMsg + '.Please try again'
      }
      else {
        for(let i = 0; i< response.length ; i++){
          if(response[i].status !== 'Not Started' ) {
            this.allReportArray.push(response[i])
        }
      }
      this.selectedReport = this.allReportArray[0];
      }

    },
      (error) => { this.isVisible = false });
  }//end:constructor

  configAgGridStyle() {
    let styles = {
      'width': '100%',
      'height': '65vh'
    };
    return styles;
  }//end:configAgGridStyle()

  ngOnInit() {

    this.assetAdoptionData = new Map();
    this.reportUnitTypeArray = new Map();
    this.unitTypeMap = new Map();
     //Error Model
     console.log(this.route.url);
     this.logOutService
     this.errorModel = new ErrorModel();
     this.errorModel.title = 'Error Popup'
     this.errorModel.button1 = 'logOut';
     this.errorModel.button2 = 'Cancel';
    //Route
    this.route.params.subscribe(params => {
      console.log('Param are', params);
    });
    this.logInService.sentData(envConfig.routerURL.Adoption_View);

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

  selectedReportView(selectedReport) {
    if(this.selectedReport.code ==='Dummy')
    {
      return; 
    }
    this.unitTypesDisplay = [];
    this.unitTypes = this.selectedReport.unitTypeList;
    this.agGridData = new AgGrid();
    this.displayData = false;
    this.isVisible = true;
    for (let singleUnit of this.unitTypes) {
      // console.log(typeof(singleUnit.code));
      this.unitTypeMap.set(singleUnit.id, singleUnit);
      this.assetAdoptionData.set(singleUnit.id, []);
      this.reportUnitTypeArray.set(singleUnit.id, []);
    }
    for (let singleUnit of this.unitTypes) {
      let  singleDisplay = new UnitType();
      singleDisplay = singleUnit;
      singleDisplay.display = false;
      this.unitTypesDisplay.push(singleDisplay); 
    }
    this.getAllUnitsReportById()
  }

  downloadReport() {
    let fileName = 'Platform_Adoption_Report.xlsx';
    let  a = document.createElement( 'a' );
    this.isVisible = true;
    document.body.appendChild( a );
    this.adoptionService.downloadReport(this.selectedReport.id).subscribe(response => {
      console.log('Download response:', response);
      var blob = new Blob([response._body], {type: "application/vnd.ms-excel"});
      var objectUrl = URL.createObjectURL(blob);
      if ( navigator.appVersion.toString()
        .indexOf( '.NET' ) > 0 || navigator.appVersion.toString()
        .indexOf( 'Edge' )) {
        window.navigator.msSaveBlob( blob, fileName );
      } else {
        var fileURL = URL.createObjectURL( blob );
        a.href = fileURL;
        a.download = fileName;
        a.click();
        document.body.removeChild(a);
      }
      this.isVisible = false;
      console.log(response);
    });
  }

  //On the load get the data of the configured units 
  getAllUnitsReportById() {
    this.adoptionService.getAllUnitsReportById(this.selectedReport.id).subscribe(response => {
      if (response.status >= 400) {
        let errorMsg
        if(response.status === 500){
          errorMsg ='500 Internal error.'
        }
        else if (response.status === 401 ){
          this.isPopupErrorVisible = true;
          this.logOutService.logOut().subscribe( res => {
            this.router.navigateByUrl('/login');
          });
         }
        else { 
          let errorResp = JSON.parse(response._body);
          errorMsg = errorResp.specificMessage;
        }
        this.isPopupErrorVisible = true;
        this.isVisible = false
        this.errorModel.content = 'Error on Service,' + errorMsg + 'Please try again'
      }
      else{ 
        for(let singleUnit of response) { 
          let unitType =  this.unitTypeMap.get(singleUnit.unitTypeId);
          this.assetAdoptionData.set(singleUnit.unitTypeId,singleUnit); 
      }
     // By default 1st unit
      this.selectedUnitTypeID = this.unitTypes[0].id;
      this.unitIndex = this.getUnitKey(this.selectedUnitTypeID); 
      
      this.unitTypesDisplay[this.unitIndex].display = true;
      
      this.reportUnitTypeArray.set(this.unitTypes[0].id,
        this.agGridConfigureService.getReportArray(this.assetAdoptionData.get(this.unitTypes[0].id).productAssetAdoptionResponse,
                                                    this.unitTypes,
                                                    this.unitTypes[0],
                                                    true,
                                                   null));
      this.frameworkComponents = { adoptionRenderer: AssetRenderer, adoptionEditor : AdoptionEditor};   
      this.agGridData = this.reportUnitTypeArray.get(this.selectedUnitTypeID);
      this.displayData = true;
      this.isVisible = false;
    //this.columnDefs = this.reportUnitTypeArray.get(1).columnDefs;
      }
    
    });
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
  
} //end: getUnitKey

  // On change the unit type 
  setDisplayAdoptionByUnit(unit:UnitType) {
    console.log(unit);
    this.displayData = false;
    this.agGridData  = new AgGrid();
    this.unitTypesDisplay[this.unitIndex].display = false;
    this.selectedUnitTypeID = unit.id;
    this.unitIndex = this.getUnitKey(unit.id);
    this.reportUnitTypeArray.set(this.selectedUnitTypeID, 
          this.agGridConfigureService.getReportArray(
                                                    this.assetAdoptionData.get(this.selectedUnitTypeID).productAssetAdoptionResponse, 
                                                    this.unitTypes, 
                                                   unit.id, 
                                                    true,
                                                    null));
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
  }//end:onPopupErrorClose

  onPopupErrorCancel(eventData: boolean) {
    this.isPopupErrorVisible = eventData;
    console.log('Popup error Component was Cancelled', eventData);
  }//end:onPopupErrorCancel

}//end:class-AdoptionViewComponent
