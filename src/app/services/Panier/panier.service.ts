import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  headers_object: any;
  public panierNbrLigne: Subject<number> = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"))
    this.headers_object?.set('Content-Type', 'application/json');
  }

  getPanierItem() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    let headers = new HttpHeaders({ 'DealerNumber': dNbr.toString() }).append("Authorization", "Bearer " + localStorage.getItem("jwt"))
    headers?.set('Content-Type', 'application/json');
    let url = "http://localhost:8080/panier/GetPanierWS";
    return this.http.get(url, { headers: headers });
  }
  deletLignePanier(ref: number) {
    let url = "http://localhost:8080/panier/DeleteLignePanier/" + ref
    return this.http.delete(url, { headers: this.headers_object, responseType: 'text' },)
  }

  //******************* numero ligne panier  ************************ */
  getPanierSize(dNbr : Number )
  {
    let url = "http://localhost:8080/panier/GetPanierSize/"+dNbr
    return this.http.get(url, { headers: this.headers_object},)
  }
 setPanierSizeAttr(s:number)
 {
   this.panierNbrLigne.next(s) ; 
 }
  //***************************************************************** */
}
