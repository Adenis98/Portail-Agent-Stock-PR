import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StockPrService {

  public headers_object ;
  
  constructor(private http: HttpClient) {
      if(localStorage.getItem("jwt")!=null)
      { 
        const helper = new JwtHelperService();
        this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"))
        this.headers_object?.set('Content-Type', 'application/json');
        }
   }
   addLineCmd(body:any)
   {
    {
      let url = "http://localhost:8080/panier/LignePanier";
     return this.http.post(url,body,{headers:this.headers_object });
    }
   }
   getStockPr(body:any)
   {
     let url = "http://localhost:8080/ListeStockAgent";
    return this.http.post(url,body,{headers:this.headers_object });
   }

}
