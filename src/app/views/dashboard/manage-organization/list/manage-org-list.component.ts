import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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
    private headingLable: String;
    private router:Router;

    constructor(
        private manageOrgService: ManageOrganizationService
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

    onSaveConfirm(event)
    {
        var a=2;
        var b=4;
        this.router.navigateByUrl('/dashboard/manage-organizations/edit');
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
            this.selectOrg = response[0];
            this.selectOrganizationType(this.selectOrg);
            this.headingLable = response[0].name;
        },
            (error) => {
                this.isVisible  =  false;
            });
    }//end:ngOnInit

}//end:class-ManageOrganizationListComponent    