import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  login(usr: String, psd:String )
  {
    let body = {username : usr , password : psd} ; 
    return this.http.post("http://localhost:8080/authenticate",body);
  }
}
