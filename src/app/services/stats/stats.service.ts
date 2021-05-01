import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  headers_object: any;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  };
  getNbrCmdStockFerme()
  {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr=decodedToken["dealerNbr"]; 
    let url = "http://localhost:8080/stat/NbrCmdStockFerme/"+dNbr;
    return this.http.get(url, { headers:this.headers_object });
  }
  getCmdByStatus()
  {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr=decodedToken["dealerNbr"]; 
    let url = "http://localhost:8080/stat/CmdLivEnrgFact/"+dNbr;
    return this.http.get(url, { headers:this.headers_object });
  }
}

