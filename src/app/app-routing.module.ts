import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/sidebarcpnts/dashboard/dashboard.component';
import { Page2Component } from './components/sidebarcpnts/page2/page2.component';
import { Page3Component } from './components/sidebarcpnts/page3/page3.component';
import { Page4Component } from './components/sidebarcpnts/page4/page4.component';
import { Page5Component } from './components/sidebarcpnts/page5/page5.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginGuardService } from './services/loginGuard/login-guard.service';

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
    component: Page3Component,
    canActivate: [AuthGuardService]
  },
  {
    path: "page4",
    component: Page4Component,
    canActivate: [AuthGuardService]
  },
  {
    path: "page5",
    component: Page5Component,
    canActivate: [AuthGuardService]
  },
  { 
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
