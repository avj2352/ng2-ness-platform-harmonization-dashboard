import { Injectable } from '@angular/core';
import { CellRendererFactory } from 'ag-grid/dist/lib/rendering/cellRendererFactory';

@Injectable()
export class AgGridConfigureService {

  constructor(
  ) {

  }  
  getReportArray = function (ReportEditListArray, unitTypeArray, selectedUnitType, readOnly, currentlockedByEmail) {
    var editableVal = !readOnly;
    if(!readOnly){
      editableVal = this.customReadOnlyRow();
    }

    var productObj = {
      'rowData': [],
      'columnDefs': [],
      'idselector': '',
      'unit': {},
      'unitKeyList': {},
      groupHeaderHeight: 20,
      headerHeight: 150,
      angularCompileRows: true,
      singleClickEdit: true,
      locked: ''
    };
    var productArray = [];
    var selectedUnitObj = {};
    //colWidths: [ 200 , 150, 150, 100 ,150,100]
    var countPlatfrom = true;
    let platFormObj = [];
    productObj.columnDefs.push({headerName:'Product Group', marryChildren: true,    
      children:[{ headerName: 'Cluster', field: 'clusterCode', width: 60, pinned: 'left' ,columnGroupShow: 'open',  filter: 'agTextColumnFilter',  suppressFilter: true , cellRenderer: 'productRenderer'},
                { headerName: 'BG', field: 'bgCode', width: 80, pinned: 'left' ,columnGroupShow: 'open' , filter: 'agTextColumnFilter', suppressFilter : true, cellRenderer: 'productRenderer'},
                { headerName: 'BU', field: 'buCode', width: 80, pinned: 'left' ,columnGroupShow: 'open' , filter: 'agTextColumnFilter' , suppressFilter : true, cellRenderer: 'productRenderer'},
                { headerName: 'Product', field: 'productName', width: 160, pinned: 'left' ,  filter: 'agTextColumnFilter', suppressFilter : true , cellRenderer: 'productRenderer'}]
  });
    //Create the platform and asset headers  
    var productEachArray = ReportEditListArray[0];
    for (var i = 0; i < productEachArray.assetDetails.length; i++) {

      if (typeof platFormObj[productEachArray.assetDetails[i].platformCode] == "undefined") {
        var assets = [];
        platFormObj[productEachArray.assetDetails[i].platformCode] = {
          headerName: productEachArray.assetDetails[i].platformCode,
          //groupId: productEachArray.assetDetails[i].platformCode,
          enableTooltip : true,
          openByDefault: true,
          marryChildren: true,
          suppressFilter: true,
          children: []
        };
        var assetOptions = this.getColoumnOptions(productEachArray.assetDetails[i].unitTypeId, unitTypeArray);
        if (assetOptions.column.length > 0) {
           var fieldName = 'asset' + productEachArray.assetDetails[i].assetId;
          platFormObj[productEachArray.assetDetails[i].platformCode].children.push({
            headerName: productEachArray.assetDetails[i].assetName,
            field: 'asset' + productEachArray.assetDetails[i].assetId,
            headerTooltip: productEachArray.assetDetails[i].assetName,                              
            cellRenderer: 'adoptionRenderer',
            cellStyle: this.paramsStyling(),
            columnGroupShow: 'open',
            cellEditor: 'adoptionEditor',
            cellEditorParams: {
            values: assetOptions.unitArray,
            },
            width: assetOptions.width,
            editable: editableVal,
            suppressFilter: true

            });
          } else {
            //Text
            platFormObj[productEachArray.assetDetails[i].platformCode].children.push({
            headerName: productEachArray.assetDetails[i].assetName,
            field: 'asset' + productEachArray.assetDetails[i].assetId,
            headerTooltip: productEachArray.assetDetails[i].assetName,                              
            columnGroupShow: 'open', 
            cellRenderer: 'adoptionRenderer', 
            cellEditor: 'adoptionEditor',     
            suppressFilter: true,       
            cellStyle:  this.paramsStyling(),
            width: assetOptions.width,
            editable: editableVal
          });
        }

      } else {
        var assetOptions = this.getColoumnOptions(productEachArray.assetDetails[i].unitTypeId, unitTypeArray);
        if (assetOptions.column.length > 0) {
          platFormObj[productEachArray.assetDetails[i].platformCode].children.push({
            headerName: productEachArray.assetDetails[i].assetName,
            field: 'asset' + productEachArray.assetDetails[i].assetId,
            cellRenderer: 'adoptionRenderer',
            cellEditor: 'adoptionEditor', 
            columnGroupShow: 'open',
            headerTooltip: productEachArray.assetDetails[i].assetName,                              
            cellStyle: this.paramsStyling(),
            cellEditorParams: {
              values: assetOptions.unitArray
            },
            width: assetOptions.width,
            editable: editableVal,
            suppressFilter: true
            
          });
        } else {
          platFormObj[productEachArray.assetDetails[i].platformCode].children.push({
            headerName: productEachArray.assetDetails[i].assetName,
            field: 'asset' + productEachArray.assetDetails[i].assetId,
            columnGroupShow: 'open',            
            width: assetOptions.width,
            editable: editableVal,
            cellRenderer: 'adoptionRenderer',
            cellEditor: 'adoptionEditor', 
            cellStyle:  this.paramsStyling(),
            suppressFilter: true
            
          });
        }
      };

    }
    //console.log(platFormObj);
    let platFormKey = [];
    for(let singlePlatform in platFormObj){
      platFormKey.push(singlePlatform);
      //productObj.columnDefs.push(singlePlatform);
      
    }
    for(var platform_c = 0; platform_c < platFormKey.length; platform_c++){
      let key = platFormKey[platform_c];
      let singlePlt = platFormObj[key];
     // console.log(singlePlt);
      productObj.columnDefs.push(singlePlt);
    }

    if(!readOnly){
      productObj.columnDefs.push({ headerName: 'Locked', field: 'locked',hide: true});    
    }
  

    for (var product_i = 0; product_i < ReportEditListArray.length; product_i++) {
      let productArray = ReportEditListArray[product_i];
      let prdObj = {} ;
      prdObj['clusterCode'] = productArray.clusterCode;
      prdObj['bgCode'] = productArray.bgCode;
      prdObj['buCode'] = productArray.buCode;
      prdObj['productName'] = productArray.productName;
      if(productArray.lock) { 
        prdObj['locked'] = { 'lock': productArray.lock, 'lockedBy': productArray.lockedByEmail, 'currentUserEmail': currentlockedByEmail };
      }
      for (var asset_j = 0; asset_j < productArray.assetDetails.length; asset_j++) {
        var keyAsset = 'asset' + productArray.assetDetails[asset_j].assetId;
        if (productArray.assetDetails[asset_j].unitType == 'select') {
          var keyAsset = 'asset' + productArray.assetDetails[asset_j].assetId
          prdObj[keyAsset] = productArray.assetDetails[asset_j];

        }
        else if (productArray.assetDetails[asset_j].unitType == 'text') {
          var keyAsset = 'asset' + productArray.assetDetails[asset_j].assetId
          prdObj[keyAsset] = productArray.assetDetails[asset_j];
        }
      }
      productObj.rowData.push(prdObj);
    }			
    console.log(productObj);
    return productObj;

  }//end:getReportproductObj.columnDefs

  customReadOnlyRow = function(params) {
      return function(params){
        
        if(params.node.data['locked'] && (params.node.data['locked'].lockedBy !== params.node.data['locked'].currentUserEmail) ){
            if(params.node.data['locked'].lock === 1)           
          return false;
        }
        return true;
      }
  }

  getColorMap = function() {
    let map = new Map();
    map.set('greycell','#96938C');
    map.set('orangecell','#f09a60');
    map.set('pinkcell','#e5c1bf');
    map.set('lightgreencell','#b5d69a');
    map.set('greencell','#458B00');
    return map;
    
  }
  paramsStyling = function(params) {
    let colorMap = this.getColorMap();
    return function(params){
      let retObj;
      let color ;
      let colObj;
      if( params.colDef.cellEditorParams){
         colObj = params.colDef.cellEditorParams.values; 
         if (params.value.unitCode ===  colObj[0].code)
         {
         //console.log(colObj[0].colorCode + "===" + params.value.unitCode);
          // color =  '#96938C';
          color =  colorMap.get(colObj[0].colorCode);
         }
         else if (params.value.unitCode === colObj[1].code){
          // console.log(colObj[1].colorCode + "===" + params.value.unitCode);   
           color =   colorMap.get(colObj[1].colorCode);
         }
         else if (params.value.unitCode === colObj[2].code){
           // console.log(colObj[2].colorCode + "===" + params.value.unitCode);    
           color =   colorMap.get(colObj[2].colorCode);
         }
         else if (params.value.unitCode=== colObj[3].code){
           // console.log(colObj[3].colorCode + "===" + params.value.unitCode);           
           color =  colorMap.get(colObj[3].colorCode);
         }
         else if (params.value.unitCode === colObj[4].code){
          // console.log(colObj[4].colorCode + "===" + params.value.unitCode);
           color =   colorMap.get(colObj[4].colorCode);
         }
         else if(params.value.unitTypeId === 3){
          return color = '';
        } 
         else {
           color = '#96938C';
         }
         retObj  =  { "background-color": color };    
      }
      if(params.data['locked']) {
        if( params.data['locked'].lock ==1 && params.data['locked'].lockedBy === params.node.data['locked'].currentUserEmail){
          retObj = {"background-color": color , 'border': '1px solid black'};
        }
    }
    return retObj;

    }
  }

  getColoumnOptions(selectedUnitType, unitTypeArray) {
    let selectedUnitObj = {
      unit : {
        keyVal:'',
        unitName:''
      },
      unitKeyList: [],
      unitArray: [],
      column: [],
      idselector: '',
      width: 0,
    } ;
    // selectedUnitObj.unit = {};
    // selectedUnitObj.unitKeyList = [];
    // selectedUnitObj.unitArray = [];
    var selectedUnitConfig;
    for (var i = 0; i < unitTypeArray.length; i++) {
      if (unitTypeArray[i].id === selectedUnitType) {
        selectedUnitConfig = unitTypeArray[i];
        break;
      }
    }
    if (selectedUnitConfig.type == 'select') {
      var columnOptions = [];
      for (var i = 0; i < selectedUnitConfig.unitList.length; i++) {
        columnOptions.push(selectedUnitConfig.unitList[i].code);
        selectedUnitObj.unitArray.push({ name: selectedUnitConfig.unitList[i].code, code: selectedUnitConfig.unitList[i].code ,colorCode :  selectedUnitConfig.unitList[i].colorCode });
        // selectedUnitObj.unitKeyList[selectedUnitConfig.unitList[i].code] = {
        // 	'name': selectedUnitConfig.unitList[i].name,
        // 	'id': selectedUnitConfig.unitList[i].id
        // };
        //Normal Select Dropdown
        selectedUnitObj.unitKeyList.push(selectedUnitConfig.unitList[i].code);
      }
      selectedUnitObj.column = columnOptions;
      selectedUnitObj.idselector = selectedUnitConfig.id;
      selectedUnitObj.width = 45;
      selectedUnitObj.unit.keyVal = 'unitCode';
      selectedUnitObj.unit.unitName = selectedUnitConfig.name;
    } else if (selectedUnitConfig.type == 'text') {

      selectedUnitObj.idselector = selectedUnitConfig.id;
      selectedUnitObj.width = 50;
      selectedUnitObj.column = [];
      //unitvalue
      selectedUnitObj.unit.keyVal = 'unitValue';
      selectedUnitObj.unit.unitName = selectedUnitConfig.name;
      // selectedUnitObj.unitKeyList[selectedUnitConfig.code] = {
      // 	'name': selectedUnitConfig.name,
      // 	'id': selectedUnitConfig.id
      // };
      selectedUnitObj.unitKeyList.push(selectedUnitConfig.name);
      //get the id of the road timing as of now later server sending					
      if (selectedUnitConfig.id == 3) {
        //This has to be decided on data
        selectedUnitObj.width = 84;
        selectedUnitObj.column = this.createRoadMapTiming();  //['Q22017','Q32017','Q42017','Q12018','Q22018'];
        for (var i = 0; i < selectedUnitObj.column.length; i++) {
          selectedUnitObj.unitArray.push({ name: selectedUnitObj.column[i], code:  selectedUnitObj.column[i] ,colorCode :  ''});
          //Normal Select Dropdown
        }
      }
    }
    return selectedUnitObj;
  } //end: getColoumnOptions
   createRoadMapTiming() {
    var timingArray = [];
    for (var i = 2015; i < 2030; i++) {
      for (var j = 1; j <= 4; j++) {
        timingArray.push(j + 'Q' + i);
      }
    }
    timingArray.push('na');
    return timingArray;
  }
  


} //end:ag-gird
