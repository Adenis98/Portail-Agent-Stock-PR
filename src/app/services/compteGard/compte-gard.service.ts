import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CompteGardService implements CanActivate {
  permis:any;
  constructor(private router:Router) { 
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    this.permis = decodedToken["permis"]; }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    if(this.permis==1)
      return true;
    else
    {
      this.router.navigate(["/login"]).then(() => {
        window.location.reload();
      });
      return false
    }
  }

}
