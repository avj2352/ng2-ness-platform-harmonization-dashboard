import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'app/services/storage/storage.service';

@Component({
  selector: 'phd-pop-up-alert',
  templateUrl: './pop-up-alert.component.html',
  styleUrls: ['./pop-up-alert.component.scss']
})
export class PopUpAlertComponent implements OnInit {

  @Input() visible:boolean;
  @Input() content:String;
  @Input() title:String;
  
  @Output() cancelAlertPopup:EventEmitter<boolean>;

  constructor(private storageService:StorageService) { 
    this.cancelAlertPopup = new EventEmitter<boolean>();
  }//end:constructor

  cancel(){
    this.cancelAlertPopup.emit(false);
  }//end:cancel

  ngOnInit() {
    
  }//end:ngOnInit

}
