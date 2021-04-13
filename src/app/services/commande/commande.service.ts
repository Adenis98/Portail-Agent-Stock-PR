import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  headers_object: any;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  passerCmd(body:any)
  {
    let url = "http://localhost:8080/commande/passer";
    return this.http.post(url,body,{ headers:this.headers_object });
  }
}

