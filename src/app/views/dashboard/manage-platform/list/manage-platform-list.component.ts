import { Component, OnInit } from '@angular/core';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { LoginService } from 'app/services/auth/login.service';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';



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
  private isVisibleLoader: boolean;
  private confirmModel: ConfirmModel;
  private isPopupConfirmVisible: boolean;
  private idDelete: number;
  private alertModel: AlertModel;
  private isPopupAlertVisible: boolean;

  constructor(
    private managePlatformService: ManagePlatformService,
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
          title: 'Display Sequence'
        },
        code: {
          title: 'Platform Code'
        },
        name: {
          title: 'Platform Name'
        },
        active: {
          title: 'Status',
        }
      }
    };
  }//end:constructor

  onDeleteConfirm(event) {
    this.idDelete = event.data.id
    this.confirmModel.content = "Are you sure you want to delete ?"
    this.isPopupConfirmVisible = true;
  }

  onPopupConfirmOk(eventData: string) {
    this.isPopupConfirmVisible = false;
    this.managePlatformService.deletePlatform(this.idDelete).subscribe((response) => {
      if (response.status != 200) {
        var msg = JSON.parse(response._body)
        this.alertModel.content = "Error in delete Platform :  " + msg.generalMessage;
        this.isPopupAlertVisible = true;
      } else {
        window.location.reload();
      }

    },
      (error) => {
        this.alertModel.content = "Error in delete "
        this.isPopupAlertVisible = true;
        console.log(error)
        // this.isVisible = false;
      });
  }//end:onPopupConfirmClose

  onPopupConfirmCancel(eventData: boolean) {
    this.isPopupConfirmVisible = eventData;
  }//end:onPopupConfirmCancel

  onPopupAlertCancel(eventData: boolean) {
    this.isPopupAlertVisible = eventData;
  }

  onEdit(event) {
    //event.data
    this.router.navigate(['/dashboard/' + envConfig.routerURL.Manage_Platform + '/edit', event.data.id]);
  }//end:onEdit

  ngOnInit() {
    // this.isVisible = true;
    //Service related   
    this.isVisibleLoader = true;
    this.confirmModel = new ConfirmModel();
    this.isPopupConfirmVisible = false;
    this.confirmModel.title = 'Confirmation '
    this.alertModel = new AlertModel();
    this.isPopupAlertVisible = false;
    this.alertModel.title = 'Alert '

    this.managePlatformService.getAllPlatformConfig().subscribe((response) => {
      if (response.status && response.status == 401) {
        this.isVisibleLoader = false;
        var msg = JSON.parse(response._body)
        this.alertModel.content = "Error in get Platform :  " + msg.generalMessage;
        this.isPopupAlertVisible = true;
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 3000)
      }
      else if (response.status && response.status == 400) {
        var msg = JSON.parse(response._body)
        if (msg.generalMessage && msg.errorCode === 1010) {
          this.alertModel.content = "Error in get Platform :  " + msg.generalMessage;
          this.isPopupAlertVisible = true;
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3000)
        } else if(msg.generalMessage){
          this.alertModel.content = "Error in get Platform :  " + msg.generalMessage;
          this.isPopupAlertVisible = true;
        }else {
          this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
          this.isPopupAlertVisible = true;
        }

      }
      else if (response.status && response.status != 401 && response.status != 200) {
        var msg = JSON.parse(response._body)
        this.alertModel.content = "Error in get platform :  " + msg.generalMessage;
        this.isPopupAlertVisible = true;
        this.isVisibleLoader = false;
      }
      else {
        var temp_data = response;
        temp_data.forEach(element => {
          if (element.active == 1) {
            element.active = 'Active'
          } else {
            element.active = 'Inactive'
          }

        });
        this.platformListData = temp_data;
        this.isVisibleLoader = false;

      }
      this.isVisibleLoader = false;
    },
      (error) => {
        console.error("Error in get platform")
        this.isVisible = false;
        this.isVisibleLoader = false;
      });
    // this.staticDataService.createMergeMapExample().subscribe(x=>console.log('Merge Map: ',x));
    // this.staticDataService.createSwitchMapExample().subscribe(x=>console.log('Switch Map', x));
  }//end:ngOnInit

}//end:class-ManageOrganizationListComponent    