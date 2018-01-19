import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
//Custom Services
import { StaticDataService } from './services/static-data/static-data.service';

//AG-Grid dependencies
import {AgGridModule} from 'ag-grid-angular/main';
import { AgGridConfigureService } from 'app/services/ag-grid-configure/ag-grid-configure.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';

const appRoutes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'dashboard', component: DashboardComponent,
  children : [      
    { path: '', redirectTo: 'adoption-entry', pathMatch: 'full' },
    { path: 'adoption-entry', component: AdoptionEntryComponent },
    { path: 'adoption-view', component: AdoptionViewComponent},    
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
    SideBarComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,config),
    LocalStorageModule.withConfig({
      prefix:'phd-app',
      storageType:'localStorage'
    }),
    AgGridModule.withComponents([])
  ],
  providers: [
    StaticDataService,
    AgGridConfigureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
