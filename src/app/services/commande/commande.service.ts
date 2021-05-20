import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  headers_object: any;
  constructor(private http: HttpClient) {
   
  }

  getLocalStorageJwt(){
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  passerCmd(body:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/commande/passer";
    return this.http.post(url,body,{ headers:this.headers_object });
  }
  getCmd(arch:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/commande/afficher/"+arch;
    return this.http.get(url, { headers:this.headers_object })
  }
  getCmdLine(ref:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/commande/afficher/ligneCmd/"+ref;
    return this.http.get(url, { headers:this.headers_object })
  }
  getDealerInfo()
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/ListeStockAgent/getDealerInfo";
    return this.http.get(url, { headers:this.headers_object })
  }
  cancelCmd(ref:any)
  {
    this.getLocalStorageJwt();
    let body={}
    let url = "http://localhost:8080/commande/annuler/"+ref;
    return this.http.post(url, body,{ headers:this.headers_object})
  }
  getCmdDetail(ref:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/commande/afficheCmdr/"+ref;
    return this.http.get(url, { headers:this.headers_object })
  }
  getVinCmd(vin:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/commande/filtreVin/"+vin;
    return this.http.get(url, { headers:this.headers_object })
  }
  getRefArtCmd(refArt:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/commande/filtreRefArt/"+refArt;
    return this.http.get(url, { headers:this.headers_object })
  }
}

