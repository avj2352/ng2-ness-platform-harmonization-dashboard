import {Component, OnInit} from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl:'./edit-assetCategories.html',
    styleUrls:['./edit-assetCategories.scss']
})
export class EditAssetCategoriesComponent implements OnInit {
    public id: string;
    public name: string;
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe( 
            params => {
                console.log("all params are "+params) 
                console.log("all params are "+params) 
                console.log("all params are "+params) 
                this.id = params["id"];
                this.name = params["name"];
                var a=0;
                var b=1;


            }

           
        );
        this.route.queryParams.subscribe(params => {
            this.id = params["id"];
            this.name = params["name"];
            var a=0;
            var b=1;
        });
    }
  
    ngOnInit(){

    }//end:ngOnInit
}//end:class-EditOrganizationComponent