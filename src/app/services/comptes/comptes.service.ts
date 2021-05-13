import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetcomptesService {

  public headers_object ;
  constructor(private http: HttpClient) {
    if(localStorage.getItem("jwt")!=null)
      this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"));
   }

  getCompte(admin:number) {
    let url = "http://localhost:8080/compte/avoirTout"+admin;
    return this.http.get(url, { headers:this.headers_object });
  }
  deletCompte(compt:any)
  {
    let url = "http://localhost:8080/compte/supprimer/"+compt.code;
    return this.http.delete(url, { headers:this.headers_object });
  }
  addCompte(body:any)
  {
    let url = "http://localhost:8080/compte/ajout";
    return this.http.post(url,body,{ headers:this.headers_object })
  }
  updateCompte(code:String,body:any)
  {
    let url = "http://localhost:8080/compte/maj/"+code;
    return this.http.put(url,body,{ headers:this.headers_object })
  }
  updateImg(body:any,userName:String)
  {
    let url = "http://localhost:8080/compte/majPhoto/"+userName;
    return this.http.post(url,body,{ headers:this.headers_object , responseType: 'text'})
  }
  getImg(userName:any)
  {
    let url = "http://localhost:8080/compte/getPhoto/"+userName;
    return this.http.get(url,{ headers:this.headers_object , responseType: 'text'});
  }
}
