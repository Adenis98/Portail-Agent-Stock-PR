import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  login(usr: String, psd:String )
  {
    let body = {username : usr , password : psd} ; 
    return this.http.post("http://localhost:8080/authenticate",body);
  };
  isLoggedIn()
  {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    const expirationDate = helper.getTokenExpirationDate(localStorage.jwt);
    const isExpired = helper.isTokenExpired(localStorage.jwt);
    return !isExpired;
  }
}
