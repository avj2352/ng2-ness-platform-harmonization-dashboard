import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { Observable } from 'rxjs/Observable';

interface ManageHierarchy {
    id:number;
    name:string;
    code:string;
    hierarchy:number;
};

@Component({
    selector: 'phd-manage-org-list',
    templateUrl:'./manage-org-list.component.html',
    styleUrls: ['./manage-org-list.component.scss']    
})
export class ManageOrganizationListComponent implements OnInit {
    private isVisible:boolean;
    private organizationTypeListData :ManageHierarchy[];
    private organizationListData :ManageHierarchy[];
    private selectOrg:any;
    private settings:any;

    constructor(
        private manageOrgService:ManageOrganizationService
    ){        
    // ng-smart-table settings        
    this.settings  =  {
    delete:  {
        confirmDelete:  true,
    },
    add:  {
        confirmCreate:  true,
    },
    edit:  {
        confirmSave:  true,
    },
    columns:  {
        hierarchy:  {
        title:   '#'
        },
        code:  {
        title:   'Code'
        },
        name:  {
        title:   'Name'
        },
        description:  {
        title:   'Description'
        },
        active:  {
        title:   'Status',
        filter:  {
            type:   'checkbox',
            config:  {
            true:   '1',
            false:   '0',
            resetText:   'clear',
            },
        },
        }
    }
    };//end:settings
    
    }//end:constructor

    selectOrganizationType(item:ManageHierarchy){
        console.log('Item selected is: ', item.name);
        this.manageOrgService.getAllOrganizationbyIdConfigById(item.id).subscribe((response) => {
            console.log('Response is: ', response);
            this.organizationListData = response;             
            },
            (error)=>{
                this.isVisible = false;
            });             
        }//end:selectOrganizationType()

        
        
        ngOnInit(){
            this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response) => {
                console.log('Response from GetAllOrganziation is: ', response);
                this.organizationTypeListData = response;  
                this.selectOrg = response[0];
                this.selectOrganizationType(this.selectOrg);
            },
            (error)=>{
            this.isVisible = false;
            });         
    }//end:ngOnInit

}//end:class-ManageOrganizationListComponent    