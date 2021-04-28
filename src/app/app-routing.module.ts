
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/sidebarcpnts/dashboard/dashboard.component';
import { Page2Component } from './components/sidebarcpnts/commande/page2.component';
import { Page3Component } from './components/sidebarcpnts/stockPr/page3.component';
import { Page4Component } from './components/sidebarcpnts/panier/page4.component';
import { Page5Component } from './components/sidebarcpnts/InterAgent/page5.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginGuardService } from './services/loginGuard/login-guard.service';
import { ComptesComponent } from './components/sidebarcpnts/comptes/comptes.component';
import { Page6Component } from './components/sidebarcpnts/stockLocal/page6.component';
import { CompteGardService } from './services/compteGard/compte-gard.service';
import { DetailPageComponent } from './components/sidebarcpnts/commande/cmdDetail/detail-page/detail-page.component';
import { PageDevisComponent } from './components/sidebarcpnts/page-devis/page-devis.component';


const routes: Routes = [
  { 
    path: "",
    component: (localStorage.getItem("jwt")!=null)?DashboardComponent:LoginComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "page2",
    component: Page2Component,
    canActivate: [AuthGuardService]
  },
  
  {
    path: "page3",
    component: PageDevisComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "page4",
    component: Page3Component,
    canActivate: [AuthGuardService]
  },
  {
    path: "page5",
    component: Page4Component,
    canActivate: [AuthGuardService]
  },
  {
    path: "page6",
    component: Page5Component,
    canActivate: [AuthGuardService]
  },
  {
    path: "page7",
    component: Page6Component,
    canActivate: [AuthGuardService]
  },
  {
    path: "comptes",
    component: ComptesComponent,
    canActivate: [AuthGuardService,CompteGardService]
  },
  {
    path: 'page2/:ref',
    component: DetailPageComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
