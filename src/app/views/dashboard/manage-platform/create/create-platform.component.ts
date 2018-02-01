import { Component, OnInit } from '@angular/core';
import { ManagePlatformService } from '../../../../services/dashboard/manage-platform.service';
import { ManageHierarchy } from './../../../../interfaces/manageHierarchy.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'phd-create-platform',
    templateUrl: './create-platform.component.html',
    styleUrls: ['./create-platform.component.scss']
})
export class CreatePlatformComponent implements OnInit {

    private platformObj: any;
    constructor(
        private managePlatformService: ManagePlatformService,
        private router: Router
    ) {


    }//end:constructor
    ngOnInit() {
        this.platformObj = {
            name: '',
            code: '',
            hierarchy: '',
            description: '',
            active:'1'
        }
    }//end:ngOnInit

    createPlatformAction(platformobj){
        this.managePlatformService.creatPlatform(platformobj).subscribe((response)  =>  {
            console.log('Response post method: ', response);
            this.router.navigateByUrl('/dashboard/manage-platform/list');
        },
            (error) => {
                console.log('Response post method: ', error);
                this.router.navigateByUrl('/dashboard/manage-platform/list');
            });
    }  
}//end:CreatePlatformComponent