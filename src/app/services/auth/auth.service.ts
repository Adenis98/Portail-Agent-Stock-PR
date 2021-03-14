import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  login(usr: String, psd:String )
  {
    let body = {userName : usr , password : psd} ; 
    return this.http.post("http://localhost:8080/authenticate",body);
  };
  isLoggedIn()
  {
    const helper = new JwtHelperService();
/*  const decodedToken = helper.decodeToken(localStorage.jwt);
    const expirationDate = helper.getTokenExpirationDate(localStorage.jwt);*/
    const isExpired = helper.isTokenExpired(localStorage.jwt);
    return !isExpired;
  }
  logout()
  {
    localStorage.clear(); 
  }
}
