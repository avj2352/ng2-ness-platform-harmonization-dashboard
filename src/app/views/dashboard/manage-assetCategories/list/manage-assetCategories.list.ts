import { Component, OnInit } from '@angular/core';
import { ManageAssetCategoriesService } from '../../../../services/dashboard/manage-assetcategories.service';
import { Router } from '@angular/router';

interface ManageHierarchy {
  id: number;
  name: string;
  code: string;
  hierarchy: number;
};

@Component({
  selector: 'phd-manage-assetCategories-list',
  templateUrl: './manage-assetCategories.list.html',
  styleUrls: ['./manage-assetCategories.list.scss']
})
export class ManageAssetCategoriesListComponent implements OnInit {
  private isVisible: boolean;
  private assetCategoriesListData: any;
  private settings: any;

  constructor(
    private manageAssetCategoriesService: ManageAssetCategoriesService,
    private router: Router
  ) {
    this.settings = {
      actions: {
        edit: false,
        add: false,
        position: 'right',
        custom: [
          {
            name: 'edit',
            title: 'Edit ',
          },
        ],
      },
      delete: {
        confirmDelete: true,
      },
      columns: {
        hierarchy: {
          title: '#'
        },
        name: {
          title: 'Name'
        },
        platform: {
              title: 'Platform Code',
              valuePrepareFunction: (value) => { return (value.code) }
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
      this.manageAssetCategoriesService.deleteAsset(event.data.id).subscribe((response) => {
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


  ngOnInit() {
    // this.isVisible = true;
    //Service related    
    this.manageAssetCategoriesService.getAssetCategoryList().subscribe((response) => {
      var temp_data = response;
      temp_data.forEach(element => {
        if (element.active == 1) {
          element.active = 'Active'
        } else {
          element.active = 'Inactive'
        }

      });
      this.assetCategoriesListData = temp_data;
    },
      (error) => {
        this.isVisible = false;
      });
    // this.staticDataService.createMergeMapExample().subscribe(x=>console.log('Merge Map: ',x));
    // this.staticDataService.createSwitchMapExample().subscribe(x=>console.log('Switch Map', x));
  }//end:ngOnInit

}//end:class-ManageOrganizationListComponent    