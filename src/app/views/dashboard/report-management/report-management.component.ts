import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagePlatformService } from './../../../services/dashboard/manage-platform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss']
})
export class ReportManagementComponent implements OnInit {
  private isVisible:boolean;
  private platformListData:any;
  private settings:any;

  constructor(
    private managePlatformService:ManagePlatformService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.settings = {
      delete: {
        confirmDelete: true,
      },
      add: {
        confirmCreate: true,
      },
      edit: {
        confirmSave: true,
      },
      columns: {
        hierarchy: {
          title: '#'
        },
        code: {
          title: 'Code'
        },
        name: {
          title: 'Name'
        },
        description: {
          title: 'Description'
        },
        active: {
          title: 'Status',
          filter: {
            type: 'checkbox',
            config: {
              true: '1',
              false: '0',
              resetText: 'clear',
            },
          },
        }
      }
    };
  }//end:constructor

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.managePlatformService.deletePlatform(event.data.id).subscribe((response) => {
        console.log(response)   
      },
      (error)=>{
        console.log(error)   
        // this.isVisible = false;
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
     this.managePlatformService.updatePlatform(event.newData).subscribe((response) => {
      console.log(response)   
    },
    (error)=>{
      console.log(error)   
      // this.isVisible = false;
    });
     
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      this.managePlatformService.creatPlatform(event.newData).subscribe((response) => {
        console.log(response)   
      },
      (error)=>{
        console.log(error)   
        // this.isVisible = false;
      });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  showAddNewReport(){
    this.router.navigateByUrl('/dashboard/createReport');
  }//end:showManagePlatform()

  ngOnInit() {
    //Route
    this.route.params.subscribe(params=>{
      console.log('Param are',params);
    });
    // this.isVisible = true;
    //Service related    
    this.managePlatformService.getAllPlatformConfig().subscribe((response) => {
      this.platformListData = response;      
    },
    (error)=>{
      this.isVisible = false;
    });
    // this.staticDataService.createMergeMapExample().subscribe(x=>console.log('Merge Map: ',x));
    // this.staticDataService.createSwitchMapExample().subscribe(x=>console.log('Switch Map', x));
  }//end:ngOnInit

}//end:class-AdoptionViewComponent
