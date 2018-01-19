import { Component, OnInit } from '@angular/core';
import { StaticDataService } from './../../../services/static-data/static-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-view',
  templateUrl: './adoption-view.component.html',
  styleUrls: ['./adoption-view.component.scss']
})
export class AdoptionViewComponent implements OnInit {
  private columnDefs:any;
  private rowData:any;  
  private isVisible:boolean;

  constructor(
    private staticDataService:StaticDataService,
    private route:ActivatedRoute
  ) {
    this.columnDefs = [
      {headerName: "Make", field: "make"},
      {headerName: "Model", field: "model"},
      {headerName: "Price", field: "price"}
    ];
    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
    ];
  }//end:constructor

  configAgGridStyle(){
    let styles = {
      'width':'100%',
      'height':'420px'
    };
    return styles;
  }//end:configAgGridStyle()

  ngOnInit() {
    //Route
    this.route.params.subscribe(params=>{
      console.log('Param are',params);
    });
    this.isVisible = true;
    //Service related
    this.staticDataService.threeSecondDelay().then((response) => {
      this.isVisible = false;      
    },
    (error)=>{
      this.isVisible = false;
    });

    // this.staticDataService.createMergeMapExample().subscribe(x=>console.log('Merge Map: ',x));
    // this.staticDataService.createSwitchMapExample().subscribe(x=>console.log('Switch Map', x));
  }//end:ngOnInit

}//end:class-AdoptionViewComponent
