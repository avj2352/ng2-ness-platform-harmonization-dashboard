import {Component, OnInit} from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl:'./edit-org.component.html',
    styleUrls:['./edit-org.component.scss']
})
export class EditOrganizationComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe( params => console.log("all params are "+params) );
    }
  
    ngOnInit(){

    }//end:ngOnInit
}//end:class-EditOrganizationComponent