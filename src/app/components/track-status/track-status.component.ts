import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'phd-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.scss']
})
export class TrackStatusComponent implements OnChanges {
  //Component property bindings
  @Input() visible:boolean;
  @Input() data:any;
  @Input() title:String;
  //Component event bindings
  @Output() closePopup:EventEmitter<boolean>;
  @Output() cancelPopup:EventEmitter<boolean>;
  //Component variables
  private reportName:String;
  private totalCount:Number;
  private submittedCount:Number;
  private pendingCount:Number;
  private tracklistData:any;

  constructor() {
    this.visible = false; 
    this.closePopup = new EventEmitter<boolean>();
    this.cancelPopup = new EventEmitter<boolean>();
  }//end:constructor

  close(){
    this.closePopup.emit(false);
  }//end:close

  cancel(){
    this.cancelPopup.emit(false);
  }//end:cancel

  ngOnChanges(){
    if(this.data){
      if(this.data.hasOwnProperty('name')){
        this.reportName = this.data.name;
        this.totalCount = this.data.organizationStatus.totalCount;
        this.submittedCount = this.data.organizationStatus.submittedCount;
        this.pendingCount = this.data.organizationStatus.pendingCount;
        this.tracklistData = this.data.organizationStatus.organizationList;
      }
    }
  }//end:ngOnChanges
  
}//end:class-TrackStatusComponent
