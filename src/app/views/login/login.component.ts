import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StaticDataService } from 'app/services/static-data/static-data.service';
import { LoginService } from 'app/services/auth/login.service';
//Models
import { UserLoginCreditional } from '../../models/user-login';
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
    private loginService:LoginService
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
    this.loginService.loginUser(this.inputObj).subscribe(res=>{
      this.isVisible = false;
      console.log('Login Response',res);
      if(res.type=='error' ){
        this.isValidError = true;
        console.error('Login Error: ', res);
      }else if(res.hasOwnProperty('errorCode')){
        this.isValidError = true;
        console.error('Login Error: ', res);
      }
      else{
        console.log('Success Response contains: ', res);
        this.loginService.storeCredentials(res);
        this.router.navigateByUrl('/dashboard');
      }
    });
  }//end:onSubmit

}//end:class-LoginComponent
