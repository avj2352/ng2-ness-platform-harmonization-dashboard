import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StaticDataService } from 'app/services/static-data/static-data.service';
import { LoginService } from 'app/services/auth/login.service';
//Models
import { UserLoginCreditional } from '../../models/user-login';
import { StorageService } from 'app/services/storage/storage.service';
@Component({
  selector: 'phd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  
})
export class LoginComponent implements OnInit {
  private version:String;
  private isVisible:boolean;
  private isValidError:boolean;
  private disabled: boolean;
  public inputObj:UserLoginCreditional;
  constructor(
    private router:Router,
    private staticService:StaticDataService,
    private loginService:LoginService,
    private storageService:StorageService
  ) { 
    this.disabled = true;
    this.inputObj = new UserLoginCreditional();
  }//end:construtor

  ngOnInit() {
    this.isValidError = false;
    this.isVisible = false;
    this.staticService.getPackageDetails().subscribe(response=>{this.version = response.version});
  }//end:ngOnInit
  
  onSubmit(inputObj:UserLoginCreditional){
    console.log(this.inputObj);
    this.isVisible = true;
    this.isValidError = false;
    this.storageService.removeCredentials();
    setTimeout(() =>{
      this.loginService.loginUser(this.inputObj).subscribe(res=>{
        this.isVisible = false;
        console.log('Login Response',res);
        if(res.type=='error' ){
          this.isValidError = true;
          this.storageService.removeCredentials();
          console.error('Login Error: ', res);
        }else if(res.hasOwnProperty('errorCode')){
          this.isValidError = true;
          this.storageService.removeCredentials();
          console.error('Login Error: ', res);
        }
        else{        
          console.log('Success Response contains: ', res);
          this.storageService.storeCredentials(res);
          this.router.navigateByUrl('/dashboard');
        }
      });
    },100);

  }//end:onSubmit

  //  checkBrowser(){
  //   var isIE = /*@cc_on!@*/false || !!document.DOCUMENT_NODE;
  //   var isChrome = !!window.chrome && !!window.chrome.webstore;
  //   var isEdge = !isIE && !!window.StyleMedia;
  //   var res = (isChrome || isEdge)
  //   if(!res){
  //     alert("Please use Chrome or Microsoft Edge for best functionality");
  //   }
  //  };

}//end:class-LoginComponent
