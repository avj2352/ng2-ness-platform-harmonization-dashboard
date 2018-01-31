import { Component, OnInit } from '@angular/core';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import { Router } from '@angular/router';

interface ManageHierarchy {
  id: number;
  name: string;
  code: string;
  hierarchy: number;
};

@Component({
  selector: 'phd-manage-platform-list',
  templateUrl: './manage-platform-list.component.html',
  styleUrls: ['./manage-platform-list.component.scss']
})
export class ManagePlatformListComponent implements OnInit {
  private isVisible: boolean;
  private platformListData: any;
  private settings: any;

  constructor(
    private managePlatformService: ManagePlatformService,
    private router: Router
  ) {
    this.settings = {
      actions: {
        edit: true,
        add: false,
        position: 'right',
        // custom: [
        //   {
        //     name: 'edit',
        //     title: 'Edit ',
        //   },
        // ],
      },
      delete: {
        confirmDelete: true,
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
        active: {
          title: 'Status',
          filter: {
            type: 'checkbox',
            config: {
              true: 'Active',
              false: 'Inactive',
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
        (error) => {
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
        (error) => {
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
        (error) => {
          console.log(error)
          // this.isVisible = false;
        });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit() {
    // this.isVisible = true;
    //Service related    
    this.managePlatformService.getAllPlatformConfig().subscribe((response) => {
      var temp_data = response;
      temp_data.forEach(element => {
        if (element.active == 1) {
          element.active = 'Active'
        } else {
          element.active = 'Inactive'
        }

      });
      this.platformListData = temp_data;
    },
      (error) => {
        this.isVisible = false;
      });
    // this.staticDataService.createMergeMapExample().subscribe(x=>console.log('Merge Map: ',x));
    // this.staticDataService.createSwitchMapExample().subscribe(x=>console.log('Switch Map', x));
  }//end:ngOnInit

}//end:class-ManageOrganizationListComponent    