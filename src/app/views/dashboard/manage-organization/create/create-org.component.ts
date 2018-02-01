import { Component, OnInit } from '@angular/core';
import { ManageOrganizationService } from 'app/services/dashboard/manage-organization.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'phd-create-org',
    templateUrl: './create-org.component.html',
    styleUrls: ['./create-org.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
    private isVisible: boolean;
    private organizationTypeListData: ManageHierarchy[];
    private selectOrg: ManageHierarchy;
    private organizationListData: ManageHierarchy[];
    private parentTypeListData: any;
    private isVisibleParentSelectBox: boolean;
    private isVisibleParentSelectBox1: boolean;
    private parentName: String;
    private orgObj: any;
    private selectedOrgObj: any;
    private selectedChildObj: any;
    constructor(
        private manageOrgService: ManageOrganizationService,
        private router: Router
    ) {


    }//end:constructor
    ngOnInit() {
        this.orgObj = {
            name: '',
            code: '',
            hierarchy: '',
            description: '',
            active:'1'
        }
        this.isVisibleParentSelectBox = false;
        this.manageOrgService.getAllOrganizationTypeConfig().subscribe((response)  =>  {
            console.log('Response from GetAllOrganziation is: ', response);
            this.organizationTypeListData =  response;
            this.selectedOrgObj= response[0];
            this.selectedChildObj={};
        },
            (error) => {
                this.isVisible  =  false;
            });
    }//end:ngOnInit

    createOrgAction(orgobj){

        orgobj.organizationType=this.selectedOrgObj;
        orgobj.parentOrganization=this.selectedChildObj;
        console.log("object coming"+orgobj)
        this.manageOrgService.creatOrganization(orgobj).subscribe((response)  =>  {
            console.log('Response post method: ', response);
            this.router.navigateByUrl('/dashboard/manage-organizations/list');
        },
            (error) => {
                console.log('Response post method: ', error);
                this.router.navigateByUrl('/dashboard/manage-organizations/list');
            });

    }

    selectParentType(item){
        this.selectedChildObj=item;
        this.isVisibleParentSelectBox1 = true;
    }

    selectOrganizationType(item: ManageHierarchy) {
        this.selectedOrgObj= item;
        if (item.id == 1) {
            this.isVisibleParentSelectBox = false;
            this.isVisibleParentSelectBox1 = true;
            this.selectedChildObj={};
        }
        else {
            this.isVisibleParentSelectBox = true;
            this.isVisibleParentSelectBox1 = true;
            var name;
            this.organizationTypeListData.forEach(function (element) {
                if (element.id == (item.id - 1)) {
                    name = element.name;
                }
            });
            this.parentName = name;
            this.manageOrgService.getAllOrganizationbyIdConfig((item.id - 1)).subscribe((response)  =>  {
                console.log('Response is: ', response);
                this.parentTypeListData  =  response;
                this.selectedChildObj= response[0];
            },
                (error) => {
                    this.isVisible  =  false;
                });
        }
    }//end:selectOrganizationType()    
}//end:CreateOrganizationComponent