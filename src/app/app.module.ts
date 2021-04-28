import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatRadioModule } from '@angular/material/radio';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/sidebarcpnts/dashboard/dashboard.component';
import { DialogAnnuler, Page2Component } from './components/sidebarcpnts/commande/page2.component';
import { Page3Component } from './components/sidebarcpnts/stockPr/page3.component';
import { Page4Component } from './components/sidebarcpnts/panier/page4.component';
import { Page5Component } from './components/sidebarcpnts/InterAgent/page5.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ComptesComponent, DialogDelete } from './components/sidebarcpnts/comptes/comptes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCommandeFerme } from './components/sidebarcpnts/stockPr/page3.component';
import { Page6Component } from './components/sidebarcpnts/stockLocal/page6.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { DetailPageComponent } from './components/sidebarcpnts/commande/cmdDetail/detail-page/detail-page.component';
import { MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { PageDevisComponent } from './components/sidebarcpnts/page-devis/page-devis.component';
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
    DetailPageComponent,
    DialogAnnuler,
    PageDevisComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule, MatIconModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    ChartsModule,
    NgxPrintModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
