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
   
  }

  getLocalStorageJwt(){
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"))
    this.headers_object?.set('Content-Type', 'application/json');
  }

  getPanierItem() {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/panier/GetPanierWS";
    return this.http.get(url, { headers: this.headers_object });
  }
  deletLignePanier(ref: number) {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/panier/DeleteLignePanier/" + ref
    return this.http.delete(url, { headers: this.headers_object, responseType: 'text' },)
  }

  //******************* numero ligne panier  ************************ */
  getPanierSize()
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/panier/GetPanierSize/"
    return this.http.get(url, { headers: this.headers_object},)
  }
 setPanierSizeAttr(s:number)
 {
   this.panierNbrLigne.next(s) ; 
 }
  //***************************************************************** */
}
