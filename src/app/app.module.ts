import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {MatRadioModule} from '@angular/material/radio';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/sidebarcpnts/dashboard/dashboard.component';
import { Page2Component } from './components/sidebarcpnts/page2/page2.component';
import { Page3Component } from './components/sidebarcpnts/page3/page3.component';
import { Page4Component } from './components/sidebarcpnts/page4/page4.component';
import { Page5Component } from './components/sidebarcpnts/page5/page5.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ComptesComponent, DialogDelete } from './components/sidebarcpnts/comptes/comptes.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogCommandeFerme}  from './components/sidebarcpnts/page3/page3.component';
import { Page6Component } from './components/sidebarcpnts/page6/page6.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    Page2Component,
    Page3Component,
    Page4Component,
    Page5Component,
    NotFoundComponent,
    ComptesComponent,
    DialogCommandeFerme,
    DialogDelete,
    Page6Component,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,MatIconModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
