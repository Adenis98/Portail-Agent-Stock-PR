import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StockPrService {

  public headers_object: HttpHeaders | undefined ;
  
  constructor(private http: HttpClient) {
    
  }
  getLocalStorageJwt(){
    if(localStorage.getItem("jwt")!=null)
    { 
      const helper = new JwtHelperService();
      this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"))
      this.headers_object?.set('Content-Type', 'application/json');
    }
  }
  addLineCmd(body:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/panier/LignePanier";
    return this.http.post(url,body,{headers:this.headers_object });
  }
  getStockPr(body:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/ListeStockAgent";
    return this.http.post(url,body,{headers:this.headers_object });
  }

}
