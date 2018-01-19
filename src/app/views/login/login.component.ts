import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StaticDataService } from 'app/services/static-data/static-data.service';
import { LoginService } from 'app/services/auth/login.service';

@Component({
  selector: 'phd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private version:String;
  private isVisible:boolean;
  private isValidError:boolean;

  constructor(
    private router:Router,
    private staticService:StaticDataService,
    private loginService:LoginService
  ) { 
    
  }//end:construtor

  ngOnInit() {
    this.isValidError = false;
    this.isVisible = false;
    this.staticService.getPackageDetails().subscribe(response=>{this.version = response.version});
  }//end:ngOnInit
  
  onSubmit(){
    this.isVisible = true;
    this.isValidError = false;
    this.loginService.loginUser().subscribe(res=>{
      this.isVisible = false;
      console.log('Login Response',res);
      if(res.type=='error'){
        this.isValidError = true;
        console.error('Login Error: ', res);
      }else{
        this.router.navigateByUrl('/dashboard');
      }
    });
  }//end:onSubmit

}//end:class-LoginComponent
