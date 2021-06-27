import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  headers_object: any;
  constructor(private http: HttpClient) {
    
  }
  getLocalStorageJwt(){
    if(localStorage.getItem("jwt")!=null)
    this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"));
  }
  
  getDevis(arch:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/devis/getAllDevis/"+arch;
    return this.http.get(url, { headers:this.headers_object })
  }
  getOneDevis(numDevis:any)
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/devis/getOneAllDevis/"+numDevis;
    return this.http.get(url, { headers:this.headers_object })
  }
  cancelDevis(numDevis:any)
  {
    this.getLocalStorageJwt();
    let body={}
    let url = "http://localhost:8080/devis/annuler/"+numDevis;
    return this.http.post(url,body, { headers:this.headers_object })
  }

  ajouterAutreLigneDevis(numDevis: Number , remise : Number , codArt : String ,qte :Number){
    this.getLocalStorageJwt();
    let body={"codArt" : codArt,"qte" : qte};
    let url = "http://localhost:8080/devis/ajouterUnLigneDevis/"+remise+"/"+numDevis;
    return this.http.post(url,body ,{ headers:this.headers_object });
  }
}
