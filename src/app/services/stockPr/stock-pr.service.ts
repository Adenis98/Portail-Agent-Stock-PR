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
      this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"))
      this.headers_object?.set('Content-Type', 'application/json');
   }
   getStockPr(body:any)
   {
     let url = "http://localhost:8080/ListeStockAgent";
    return this.http.post(url,body,{headers:this.headers_object });
   }
   addLineCmd(body:any)
   {
    {
      let url = "http://localhost:8080/panier/LignePanier";
     return this.http.post(url,body,{headers:this.headers_object });
    }
   }
   getPanierItem(dealerNumber:string)
   {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr=decodedToken["dealerNbr"]; 
    let headers = new HttpHeaders({'DealerNumber':dNbr.toString()}).append("Authorization","Bearer "+localStorage.getItem("jwt"))
    headers?.set('Content-Type', 'application/json');
    let url = "http://localhost:8080/panier/GetPanierWS";
    return this.http.get(url,{headers:headers});
   }
}
