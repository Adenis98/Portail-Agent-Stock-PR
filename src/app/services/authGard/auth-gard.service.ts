import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private auth:LoginServiceService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.auth.isLoggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate([""]);
      return false
    }
  }

  
}
