import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StockLocalService {
  headers_object: any;
  dNbr: any;

  constructor(private http: HttpClient) {
    if(localStorage.getItem("jwt") != null) {
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"))
    }
  }
  getStockLocal() {
    const helper = new JwtHelperService();
    this.headers_object?.set('Content-Type', 'application/json');
    let url = "http://localhost:8080/ListeStockAgent/monStock";
    return this.http.get(url, { headers: this.headers_object });
  }
}
