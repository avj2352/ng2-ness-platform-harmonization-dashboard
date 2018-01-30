import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//Custom Views/Pages
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AdoptionEntryComponent } from './views/dashboard/adoption-entry/adoption-entry.component';
import { AdoptionViewComponent } from './views/dashboard/adoption-view/adoption-view.component';
import { ManageOrganizationComponent } from './views/dashboard/manage-organization/manage-organization.component';
import { ManageOrganizationListComponent } from './views/dashboard/manage-organization/list/manage-org-list.component';
import { CreateOrganizationComponent } from './views/dashboard/manage-organization/create/create-org.component';
import { EditOrganizationComponent } from './views/dashboard/manage-organization/edit/edit-org.component';
import { ReportManagementComponent } from './views/dashboard/report-management/report-management.component';
import { ReportManagementListComponent } from './views/dashboard/report-management/list/report-management-list.component';
import { CreateReportComponent } from './views/dashboard/report-management/create/create-report.component';
//Custom Components
import { LoaderComponent } from './components/loader/loader.component';
import { PopupInfoComponent } from './components/popup-info/popup-info.component';
import { ButtonDropdownComponent } from './components/button-dropdown/button-dropdown.component';
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';
import { AdoptionEditor } from 'app/components/agGridRenderer/ag-grid-editor.component';
//Custom Services
import { StaticDataService } from './services/static-data/static-data.service';
import { LoginService } from './services/auth/login.service';
import { LogoutService } from './services/auth/logout.service';
//AG-Grid dependencies and Smart Table
import {AgGridModule} from 'ag-grid-angular/main';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgGridConfigureService } from './services/ag-grid-configure/ag-grid-configure.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'app/services/auth/token-interceptor.service';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { AdoptionService } from 'app/services/adoption-service/adoption.service';


const appRoutes: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,
  children : [      
    { path: '', redirectTo: 'reportEdit', pathMatch: 'full' },
    { path: 'reportEdit', component: AdoptionEntryComponent },
    { path: 'quarterlyStatus', component: AdoptionViewComponent},    
    { path: 'manage-organizations', component:ManageOrganizationComponent,
      children:[
        { path:'', redirectTo:'list', pathMatch:'full'},
        {path:'list', component:ManageOrganizationListComponent},
        {path:'create', component:CreateOrganizationComponent},
        {path:'edit/:obj', component:EditOrganizationComponent}
      ]
    },
    { path: 'report-management', component:ReportManagementComponent,
      children:[
        { path:'', redirectTo:'list', pathMatch:'full'},
        {path:'list', component:ReportManagementListComponent},
        {path:'create', component:CreateReportComponent},
        {path:'edit', component:EditOrganizationComponent}
      ]
    }  
    ]
  }
]

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdoptionEntryComponent,
    AdoptionViewComponent,
    LoaderComponent,
    PopupInfoComponent,
    ButtonDropdownComponent,
    SideBarComponent,
    AssetRenderer,
    AdoptionEditor,
    ManageOrganizationComponent,
    ReportManagementComponent,
    ReportManagementListComponent,
    ManageOrganizationListComponent,
    CreateOrganizationComponent,
    CreateReportComponent,
    EditOrganizationComponent,
    BreadCrumbComponent,
    ToggleSwitchComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,config),
    LocalStorageModule.withConfig({
      prefix:'phd-app',
      storageType:'localStorage'
    }),
    AgGridModule.withComponents([AssetRenderer,AdoptionEditor]),
    Ng2SmartTableModule
  ],
  providers: [
    AdoptionService,
    StaticDataService,
    AgGridConfigureService,
    LoginService,
    LogoutService,
    TokenInterceptor,        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
