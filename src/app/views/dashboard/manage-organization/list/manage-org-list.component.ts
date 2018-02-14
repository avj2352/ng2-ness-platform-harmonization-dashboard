import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { Observable } from 'rxjs/Observable';
//Custom Modules from ng2-smart-table
import { Grid } from 'ng2-smart-table/lib/grid';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { Row } from 'ng2-smart-table/lib/data-set/row';
import { deepExtend } from 'ng2-smart-table/lib/helpers';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { Router } from '@angular/router';
import * as envConfig from 'app/services/constants/env.endpoints';
import { ConfirmModel } from '../../models/confirmModel';
import { AlertModel } from '../../models/alertModel';


interface ManageHierarchy {
    id: number;
    name: string;
    code: string;
    hierarchy: number;
};

@Component({
    selector: 'phd-manage-org-list',
    templateUrl: './manage-org-list.component.html',
    styleUrls: ['./manage-org-list.component.scss']
})
export class ManageOrganizationListComponent implements OnInit {
    private isVisible: boolean;
    private organizationTypeListData : ManageHierarchy[];
    private organizationListData : ManageHierarchy[];
    private selectOrg: any;
    private settings: any;
    private isVisibleLoader: boolean;
    private headingLable: String;
    private confirmModel: ConfirmModel;
    private isPopupConfirmVisible: boolean;
    private idDelete: number;
    private alertModel: AlertModel;
    private isPopupAlertVisible: boolean;

    constructor(
        private manageOrgService: ManageOrganizationService,
        private router: Router
    ) {
        // ng-smart-table settings        

    }//end:constructor

    selectOrganizationType(item: ManageHierarchy) {
        this.isVisibleLoader = true;
        console.log('Item selected is: ', item.name);
        this.manageOrgService.getAllOrganizationbyIdConfig(item.id).subscribe((response) => {
            console.log('Response is: ', response);
            var temp_data = response;
            temp_data.forEach(element => {
                if (element.active == 1) {
                    element.active = 'Active'
                } else {
                    element.active = 'Inactive'
                }

            });
            this.organizationListData = temp_data;
            this.headingLable = item.name;
            this.isVisibleLoader = false;
            this.settings = {
                actions: {
                    edit: false,
                    add: false,
                    position: 'right',
                    custom: [
                        {
                            name: 'edit',
                            title: 'Edit ',
                            // editConfirm:  true,
                        },
                    ],
                },
                delete: {
                    confirmDelete: true,
                },
                // add:  {
                //     confirmCreate:  true,
                // },
                // edit:  {
                //     confirmSave:  true,
                // },
                columns: {
                    hierarchy: {
                        title: '#'
                    },
                    code: {
                        title: this.headingLable + ' Code'
                    },
                    name: {
                        title: this.headingLable + ' Name'
                    },
                    // parentOrganization: {
                    //     title: 'Parent Organization',
                    //     valuePrepareFunction: (value) => { return (value.name+" "+value.code) }
                    // },
                    // parentOrganization: {
                    //     title: 'Parent Organization',
                    //     valuePrepareFunction: (value) => { return value.code }
                    // },
                    // name: {
                    //     title: this.headingLable + ' Name'
                    // },
                    // parentOrganization.code: {
                    //     title: this.headingLable + ' Code'
                    // },
                    // parentOrganization.name: {
                    //     title: this.headingLable + ' Name'
                    // },
                    active: {
                        title: 'Status',
                    }
                }
            };//end:settings

        },
            (error) => {
                this.isVisible = false;
                this.isVisibleLoader = false;
            });
    }//end:selectOrganizationType()

    onEdit(event) {
        this.router.navigate(['/dashboard/' + envConfig.routerURL.Manage_Organizations + '/edit', event.data.id]);
    }

    onDeleteConfirm(event) {
        this.idDelete = event.data.id
        this.confirmModel.content = "Are you sure you want to delete ?"
        this.isPopupConfirmVisible = true;
    }

    onPopupConfirmOk(eventData: string) {
        this.isPopupConfirmVisible = false;
            this.manageOrgService.deleteOrganization(this.idDelete).subscribe((response) => {
                if (response.status != 200) {
                    var msg = JSON.parse(response._body)
                    this.alertModel.content = "Error in delete Organization :  " + msg.generalMessage;
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
    }//end:onPopupAlertCancel


    ngOnInit() {
        this.isVisibleLoader = true;
        this.confirmModel = new ConfirmModel();
        this.isPopupConfirmVisible = false;
        this.confirmModel.title = 'Confirmation '
        this.alertModel = new AlertModel();
        this.isPopupAlertVisible = false;
        this.alertModel.title = 'Alert '
        this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response) => {
            if (response.status && response.status == 401) {
                this.isVisibleLoader = false;
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in get Organziation :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                setTimeout(() => {
                  this.router.navigateByUrl('/login');
                }, 3000)
              }
              else if (response.status && response.status == 400) {
                var msg = JSON.parse(response._body)
                if (msg.generalMessage && msg.errorCode === 1010) {
                  this.alertModel.content = "Error in get Organziation :  " + msg.generalMessage;
                  this.isPopupAlertVisible = true;
                  setTimeout(() => {
                    this.router.navigateByUrl('/login');
                  }, 3000)
                } else {
                  this.alertModel.content = "Internal error : Please try again. If this problem still persist. Please login and logout";
                  this.isPopupAlertVisible = true;
                }
        
              }
              else if (response.status && response.status != 401 && response.status != 200) {
                var msg = JSON.parse(response._body)
                this.alertModel.content = "Error in get Organziation :  " + msg.generalMessage;
                this.isPopupAlertVisible = true;
                this.isVisibleLoader = false;
              }
              else{
                console.log('Response from GetAllOrganziation is: ', response);
                this.organizationTypeListData = response;
                this.selectOrg = response[0];
                this.selectOrganizationType(this.selectOrg);
                this.headingLable = response[0].name;
                this.isVisibleLoader = false;

              }
              this.isVisibleLoader = false;

        },
            (error) => {
                this.isVisible = false;
                this.isVisibleLoader = false;
            });
    }//end:ngOnInit
}//end:class-ManageOrganizationListComponent    