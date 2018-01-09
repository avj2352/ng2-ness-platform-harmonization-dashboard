import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//Custom Components
import { LoginComponent } from './views/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
//AG-Grid dependencies
import {AgGridModule} from 'ag-grid-angular/main';
import { LoaderComponent } from './components/loader/loader.component';

const appRoutes: Routes = [  
  { path: 'login', component: LoginComponent },  
  { path: 'dashboard', component: DashboardComponent },  
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
    LoaderComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
