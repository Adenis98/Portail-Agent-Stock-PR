import { AuthGardService } from './services/authGard/auth-gard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/sidebarcpnts/dashboard/dashboard.component';
import { Page2Component } from './components/sidebarcpnts/page2/page2.component';
import { Page3Component } from './components/sidebarcpnts/page3/page3.component';
import { Page4Component } from './components/sidebarcpnts/page4/page4.component';
import { Page5Component } from './components/sidebarcpnts/page5/page5.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGardService]
  },
  {
    path: "page2",
    component: Page2Component,
    canActivate: [AuthGardService]
  },
  {
    path: "page3",
    component: Page3Component,
    canActivate: [AuthGardService]
  },
  {
    path: "page4",
    component: Page4Component,
    canActivate: [AuthGardService]
  },
  {
    path: "page5",
    component: Page5Component,
    canActivate: [AuthGardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
