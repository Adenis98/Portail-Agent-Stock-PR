import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  headers_object: any;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  getDevis(arch:any)
  {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr=decodedToken["dealerNbr"]; 

    let url = "http://localhost:8080/devis/getAllDevis/"+dNbr+"/"+arch;
    return this.http.get(url, { headers:this.headers_object })
  }
  getOneDevis(numDevis:any)
  {
    let url = "http://localhost:8080/devis/getOneAllDevis/"+numDevis;
    return this.http.get(url, { headers:this.headers_object })
  }
  cancelDevis(numDevis:any)
  {
    let body={}
    let url = "http://localhost:8080/devis/annuler/"+numDevis;
    return this.http.post(url,body, { headers:this.headers_object })
  }
}
