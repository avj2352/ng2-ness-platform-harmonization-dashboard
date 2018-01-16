import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'phd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { 
  }//end:construtor

  ngOnInit() {

  }//end:ngOnInit

  onSubmit(){
    this.router.navigateByUrl('/dashboard');
  }//end:onSubmit

}//end:class-LoginComponent
