import { environment } from './../../../environments/environment';
const apiURL = require("./../../../assets/data/env.config.json");
//http://161.85.105.168:8080/shpar_dev/,
let base = '';
if(environment.production){
    base = apiURL.prod.target;
}else {
    base = apiURL.dev.target;
};

export const appURL = {    
    'assetAdoption': base + 'assetadoption/initiatedReport',
    'assetAdoptionByReportID': base + 'assetadoption',
    'downloadReport': base + 'excel/assetAdoption',
    'initiatedReportUnitTypes': base + 'report/initiatedReport/unitTypes',
    'allReports': base+'report',
    'allPlatforms':base+'platform',
    'allAsset':base+'asset',
    'loginLDAP': base + 'ldaplogin',
    'allAssetType':base+'assettype', 
    'loginEndPoint':base+'login',
    'logoutEndPoint': base+ 'logout',           
    'updateAssetAdoption': base + 'assetadoption',
    'selectedRole': base + 'selectedRole',
    'assetSubmit':base + 'assetadoption/submit',
    //reportManagment
    'allUnitTypes':base+'report/unitType',
    'createReport':base+'report',
    'createPlatform':base+'platform',
    'createAsset':base+'asset',
    'updatePlatform':base+'platform',
    'updateAsset':base+'asset',
    'deletePlatform':base+'platform',
    'deleteAsset':base+'asset', 
     'initiateReport': base + 'report/initiate',
     'closeReport': base + 'report/close',
     'reinitiate':base + 'report/reinitiate',
     'deleteReport':base+'report',
     'editReport':base+'report',
     'allOrganizationTypesbyId':base+'organization?organizationTypeId',
     'createOrganization':base+'organization',
     'allOrganizationType':base+'organizationtype',
     'deleteOrganization':base+'organization',
     'updateOrganization':base+'organization',
     'organizationbyId':base+'organization',
     //locking
     'initiateLockReport': base + 'assetadoption/initiatedReport/lock',
     'releaseLockReport':  base + 'assetadoption/releaseLock',
     
    // 'initiatedReportUnitTypes':'app/data/unitType.json',
    // 'assetAdoption': 'app/data/unitTypeReturn.json',
    // 'allReports': 'app/data/allReports.json',
    // 'loginEndPoint':'app/data/singleUser.json',    
    'verifyToken': 'users/verifytoken',
    'activateUser': 'users/activateUser',
    'resetPasswordLink': 'users/resetpasswordlink',
    'sendActivationLink': 'users/sendActivationLink',
}; 

export const globalMessage ={
    'pageNotFound': 'There was server error.Please refresh the page',
    'serverDown': 'The requested url was not found',
    'saveTitle':'Save Report',
    'saveMessage':'Are you sure you want to save changes',
    'submitMessage':'Are you sure you want to submit changes',
    'alert':'Alert',
    'pendingChange':'Are you sure you want to navigate away from this page?\n\nYou have unsaved data.\n\nPress OK to continue or Cancel to stay on the current page.',
    'closeTitle': 'Close',
    'closeMessage': 'Once closed you will not be able to edit for the current time period.Are you sure you want close the report.?',
    'initiateTitle': 'Initiate',
    'initiateMessage': 'Initiate the Report',
    'reInitiateTitle': 'Reinitiate',
    'reInitiateMessage': 'Are you sure yow want to reinitiate the report',
    'deleteTitle': 'Delete',
    'deleteMessage': 'Once deleted you will not be able to see the report.Are you sure you want delete the report.?',
    'editTitle': 'Edit',
    'editMessage': 'Edit the report',
     'editReportMessage': 'Are you sure you want to save the report changes',
     'editReport': 'Save the report'
};//end:globalMessage constant

export const routerURL = {
    'Adoption_Entry': 'Adoption_Entry',
    'Adoption_View':     'Adoption_View',
    'Report_Management': 'Report_Management',
    'Manage_Platform': 'Manage_Platforms',
    'Manage_AssetCategories': 'Manage_Assets',
    'Manage_Organizations': 'Manage_Organizations'
}

export enum premssionEnum { 
    CAO = 1,
    BG = 3 
};  
