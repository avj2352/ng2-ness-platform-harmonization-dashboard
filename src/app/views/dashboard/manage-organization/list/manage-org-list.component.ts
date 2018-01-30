import { Component, OnInit, OnChanges, Input, SimpleChange} from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { Observable } from 'rxjs/Observable';
//Custom Modules from ng2-smart-table
import { Grid } from 'ng2-smart-table/lib/grid';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { Row } from 'ng2-smart-table/lib/data-set/row';
import { deepExtend } from 'ng2-smart-table/lib/helpers';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { Router } from '@angular/router';

interface ManageHierarchy {
    id:number;
    name:string;
    code:string;
    hierarchy:number;
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
    private headingLable: String;
  
    constructor(
        private manageOrgService: ManageOrganizationService,
        private router:Router
    ) {
        // ng-smart-table settings        

    }//end:constructor

    selectOrganizationType(item: ManageHierarchy) {
        console.log('Item selected is: ', item.name);
        this.manageOrgService.getAllOrganizationbyIdConfig(item.id).subscribe((response)  =>  {
            console.log('Response is: ', response);
            var temp_data = response;
            temp_data.forEach(element => {
                if (element.active == 1) {
                    element.active = 'Active'
                } else {
                    element.active = 'Inactive'
                }

            });
            this.organizationListData  = temp_data;
            this.headingLable = item.name;
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
            };//end:settings

        },
            (error) => {
                this.isVisible  =  false;
            });
    }//end:selectOrganizationType()

    onEdit(event)
    {
        //event.data
        this.router.navigate(['/dashboard/manage-organizations/edit',event.data.id,event.data.name]);
    }

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.manageOrgService.deleteOrganization(event.data.id).subscribe((response) => {
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

    ngOnInit() {
        this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response)  =>  {
            console.log('Response from GetAllOrganziation is: ', response);
            this.organizationTypeListData  =  response;
            this.selectOrg = response[1];
            this.selectOrganizationType(this.selectOrg);
            this.headingLable = response[1].name;
        },
            (error) => {
                this.isVisible  =  false;
            });
    }//end:ngOnInit
}//end:class-ManageOrganizationListComponent    