import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'angular-2-local-storage';
import {UserRoleModel} from './../../models/user-role-model';


class UserProfile {
  id:Number;
  firstName:string;
  lastName:string;
  email:string;
  roleList:UserRoleModel[];
  selectedRole:UserRoleModel;  
  sessionID:string;
}

@Injectable()
export class StorageService {
  private userStore:UserProfile;

  constructor(
    private localStorage:LocalStorageService,
    private cookieService: CookieService,
  ) {
    this.userStore = new UserProfile();
  }//end:constructor

  storeCredentials(inputObj:any){      
      //Store credentials
      this.userStore.id = inputObj.id;
      this.userStore.firstName = inputObj.firstName;
      this.userStore.lastName = inputObj.lastName;
      this.userStore.email = inputObj.email;
      this.userStore.selectedRole = inputObj.selectedRole;
      this.userStore.roleList = inputObj.roleList;
      this.userStore.sessionID = inputObj.sessionId;      
      //Using Cookies
      // this.cookieService.delete('phdSession');
      // this.cookieService.set('phdSession',JSON.stringify(this.userStore));      
      // Using LocalStorage
      this.localStorage.remove('phdSession');
      this.localStorage.add('phdSession',JSON.stringify(this.userStore));
      return true;    
  }//end:storeCredentials

  updateCredentialsWithRole(inputRole:UserRoleModel){
    this.userStore = this.retrieveCredentials();
    this.userStore.selectedRole = inputRole;
    //Using Cookies
    // this.cookieService.set('phdSession',JSON.stringify(this.userStore));
    //Using LocalStorage
    this.localStorage.set('phdSession',JSON.stringify(this.userStore));
    return true;
  }//end:updateCredentialsWithRole

  retrieveCredentials():UserProfile{
    //Using Cookies
    // const stringValue = this.cookieService.get('phdSession');
    //Using localStorage    
    const stringValue:any = this.localStorage.get('phdSession');
    return JSON.parse(stringValue);
  }//end:retrieveCredentials

  getFirstName():string{
    this.userStore = this.retrieveCredentials();
    return this.userStore.firstName;
  }//end:getFirstName

  getLastName():string{
    this.userStore = this.retrieveCredentials();
    return this.userStore.lastName;
  }//end:getFirstName

  getFullName():string{
    this.userStore = this.retrieveCredentials();
    return `${this.userStore.firstName} ${this.userStore.lastName}`;
  }//end:getFirstName

  getSessionId():any{
    this.userStore = this.retrieveCredentials();
    return this.userStore.sessionID;
  }//end:getSessionId

  getUserId():Number{
    this.userStore = this.retrieveCredentials();
    return this.userStore.id;
  }//end:getUserId

  getEmail():string{
    this.userStore = this.retrieveCredentials();
    return this.userStore.email;
  }//end:getEmail

  getSelectedRole():UserRoleModel{
    this.userStore = this.retrieveCredentials();
    return this.userStore.selectedRole;
  }//end:getSelectedRole


  getListOfRoles():UserRoleModel[]{
    this.userStore = this.retrieveCredentials();
    return this.userStore.roleList;
  }//end:getListOfRoles

  removeCredentials(){
    this.userStore = new UserProfile(); // Dereference the field
    //Using Cookies
    this.cookieService.delete('JSESSIONID');
    return this.cookieService.delete('phdSession'); // Delete the cookie
  }//end:removeCredentials

  removejSessionCookie(){    
    //Using Cookies
    this.cookieService.delete('JSESSIONID');
  }//end:removejSessionCookie

}//end:class-StorageService
