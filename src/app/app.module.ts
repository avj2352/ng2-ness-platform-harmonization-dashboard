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
//Custom Components
import { LoaderComponent } from './components/loader/loader.component';
import { PopupInfoComponent } from './components/popup-info/popup-info.component';
import { ButtonDropdownComponent } from './components/button-dropdown/button-dropdown.component';
import { AssetRenderer } from 'app/components/agGridRenderer/ag-grid-renderer.component';

//Custom Services
import { StaticDataService } from './services/static-data/static-data.service';
import { LoginService } from 'app/services/auth/login.service';
import { LogoutService } from 'app/services/auth/logout.service';
//AG-Grid dependencies and Smart Table
import {AgGridModule} from 'ag-grid-angular/main';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgGridConfigureService } from 'app/services/ag-grid-configure/ag-grid-configure.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'app/services/auth/token-interceptor.service';


const appRoutes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'dashboard', component: DashboardComponent,
  children : [      
    { path: '', redirectTo: 'reportEdit', pathMatch: 'full' },
    { path: 'reportEdit', component: AdoptionEntryComponent },
    { path: 'quarterlyStatus', component: AdoptionViewComponent},    
    // { path: 'manage-organizations', component:ManageOrganizationComponent,}
    ]
  },  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

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
    AssetRenderer   
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
    AgGridModule.withComponents([AssetRenderer]),
    Ng2SmartTableModule
  ],
  providers: [
    StaticDataService,
    AgGridConfigureService,
    LoginService,
    LogoutService,
    TokenInterceptor,        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
