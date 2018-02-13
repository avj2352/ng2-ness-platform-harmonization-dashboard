import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from 'ngx-cookie-service';

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
import { ManagePlatformComponent } from './views/dashboard/manage-platform/manage-platform.component';
import { ManagePlatformListComponent } from './views/dashboard/manage-platform/list/manage-platform-list.component';
import { CreatePlatformComponent } from './views/dashboard/manage-platform/create/create-platform.component';
import { EditPlatformComponent } from './views/dashboard/manage-platform/edit/edit-platform.component';
import { ManageAssetCategoriesComponent } from './views/dashboard/manage-assetCategories/manage-assetCategories.component';
import { ManageAssetCategoriesListComponent } from './views/dashboard/manage-assetCategories/list/manage-assetCategories.list';
// import { ManageAssetCategoriesListComponent } from './views/dashboard/manage-assetCategories/list/manage-assetCategories-list.';
import { CreateAssetCategoriesComponent } from './views/dashboard/manage-assetCategories/create/create-assetCategories';
import { EditAssetCategoriesComponent } from './views/dashboard/manage-assetCategories/edit/edit-assetCategories';
import { EditReportComponent } from './views/dashboard/report-management/edit/edit-report.component';
//Custom Components
import { LoaderComponent } from './components/loader/loader.component';
import { PopupInfoComponent } from './components/popup-info/popup-info.component';
import { ButtonDropdownComponent } from './components/button-dropdown/button-dropdown.component';
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';
import { AdoptionEditor } from 'app/components/agGridRenderer/ag-grid-editor.component';
import { TrackStatusComponent } from 'app/components/track-status/track-status.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PopUpErrorComponent } from './components/pop-up-error/pop-up-error.component';
import * as envConfig from './../app/services/constants/env.endpoints';

//Custom Services
import { StaticDataService } from './services/static-data/static-data.service';
import { LoginService } from './services/auth/login.service';
import { LogoutService } from './services/auth/logout.service';
import { AdoptionService } from 'app/services/adoption-service/adoption.service';
import { TokenInterceptor } from 'app/services/auth/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//AG-Grid dependencies and Smart Table
import { AgGridModule } from 'ag-grid-angular/main';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgGridConfigureService } from './services/ag-grid-configure/ag-grid-configure.service';
import { PopUpConfirmComponent } from './components/pop-up-confirm/pop-up-confirm.component';
import { PopUpAlertComponent } from './components/pop-up-alert/pop-up-alert.component';
import { PopUpMessageComponent } from './components/pop-up-message/pop-up-message.component';





const appRoutes: Routes = [
 { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,
  children : [      
    // { path: '', redirectTo: 'Adoption_Entry', pathMatch: 'full' },
    { path: envConfig.routerURL.Adoption_Entry, component: AdoptionEntryComponent },
    { path: envConfig.routerURL.Adoption_View, component: AdoptionViewComponent},       
    { path: envConfig.routerURL.Manage_Organizations, component:ManageOrganizationComponent,
      children:[
        { path:'', redirectTo:'list', pathMatch:'full'},
        {path:'list', component:ManageOrganizationListComponent},
        {path:'create', component:CreateOrganizationComponent},
        {path:'edit/:id', component:EditOrganizationComponent}
      ]
    },
    { path:envConfig.routerURL.Report_Management, component:ReportManagementComponent,
      children:[
        { path:'', redirectTo:'list', pathMatch:'full'},
        {path:'list', component:ReportManagementListComponent},
        {path:'create', component:CreateReportComponent},
        {path:'edit/:id', component:EditReportComponent}
      ]
    } , 
    { path: envConfig.routerURL.Manage_Platform, component:ManagePlatformComponent,
    children:[
      { path:'', redirectTo:'list', pathMatch:'full'},
      {path:'list', component:ManagePlatformListComponent},
      {path:'create', component:CreatePlatformComponent},
      {path:'edit/:id', component:EditPlatformComponent}
    ]}
,
      {
        path:envConfig.routerURL.Manage_AssetCategories, component: ManageAssetCategoriesComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ManageAssetCategoriesListComponent },
          { path: 'create', component: CreateAssetCategoriesComponent },
          { path: 'edit/:id', component: EditAssetCategoriesComponent }
        ]
      },
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
    TrackStatusComponent,
    ButtonDropdownComponent,
    SideBarComponent,
    AssetRenderer,
    AdoptionEditor,
    ManageOrganizationComponent,
    ManagePlatformComponent,
    EditPlatformComponent,
    CreatePlatformComponent,
    ReportManagementComponent,
    ManagePlatformListComponent,
    ReportManagementListComponent,
    ManageOrganizationListComponent,
    CreateOrganizationComponent,
    CreateReportComponent,
    EditOrganizationComponent,
    BreadCrumbComponent,
    ToggleSwitchComponent,
    PopUpErrorComponent,  
    PopUpConfirmComponent, 
    PopUpAlertComponent,
    PopUpMessageComponent, 
    ManageAssetCategoriesComponent,
    EditAssetCategoriesComponent,
    CreateAssetCategoriesComponent,
    ManageAssetCategoriesListComponent,
    EditReportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, config),
    LocalStorageModule.withConfig({
      prefix: 'phd-app',
      storageType: 'localStorage'
    }),
    AgGridModule.withComponents([AssetRenderer, AdoptionEditor]),
    Ng2SmartTableModule
  ],
  providers: [
    AdoptionService,
    StaticDataService,
    AgGridConfigureService,
    LoginService,
    LogoutService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
