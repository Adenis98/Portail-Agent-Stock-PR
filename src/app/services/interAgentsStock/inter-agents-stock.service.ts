import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class InterAgentsStockService {
  public headers_object ;
  constructor(private http: HttpClient) {
    if(localStorage.getItem("jwt")!=null)
    { 
      const helper = new JwtHelperService();
      this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"))
      this.headers_object?.set('Content-Type', 'application/json');
    }
  }
  addLineCmd(dNbr:number)
  {
    let url = "http://localhost:8080/getAllAgentsStock/"+dNbr;
    return this.http.get(url,{headers:this.headers_object });
  }
}
