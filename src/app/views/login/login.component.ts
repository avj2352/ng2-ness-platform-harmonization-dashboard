import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StaticDataService } from 'app/services/static-data/static-data.service';

@Component({
  selector: 'phd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private version:String;
  constructor(
    private router:Router,
    private staticService:StaticDataService
  ) { 
  }//end:construtor

  ngOnInit() {
    this.staticService.getPackageDetails().subscribe(response=>{this.version = response.version});
  }//end:ngOnInit

  onSubmit(){
    this.router.navigateByUrl('/dashboard');
  }//end:onSubmit

}//end:class-LoginComponent
