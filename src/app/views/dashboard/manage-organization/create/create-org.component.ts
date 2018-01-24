import { Component, OnInit } from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';


@Component({
    selector:'phd-create-org',
    templateUrl:'./create-org.component.html',
    styleUrls:['./create-org.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
    private isVisible:boolean;
    private organizationTypeListData:ManageHierarchy[];
    private selectOrg:ManageHierarchy;
    private organizationListData:ManageHierarchy[];
    constructor (
        private manageOrgService:ManageOrganizationService
    ){

    }//end:constructor
    ngOnInit(){
        this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response) => {
            console.log('Response from GetAllOrganziation is: ', response);
            this.organizationTypeListData= response;  
            this.selectOrg = response[0];
            this.selectOrganizationType(this.selectOrg);
        },
        (error)=>{
        this.isVisible = false;
        }); 
    }//end:ngOnInit

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

}//end:CreateOrganizationComponent