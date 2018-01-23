import { Component, OnInit, Input} from '@angular/core';
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
    private organizationListData:ManageHierarchy[];
    
    constructor(
        private manageOrgService:ManageOrganizationService
    ){        
        
    }//end:constructor

    selectOrganizationType(item:ManageHierarchy){
        console.log('Item selected is: ', item.name);
    }//end:selectOrganizationType()

    ngOnInit(){
        this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response) => {
            console.log('Response is: ', response);
            this.organizationListData = response;             
            },
            (error)=>{
            this.isVisible = false;
            }); 
    }//end:ngOnInit

}//end:class-ManageOrganizationListComponent    