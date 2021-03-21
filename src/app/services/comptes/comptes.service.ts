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

  getCompte() {
    let url = "http://localhost:8080/compte/avoirTout";
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
  updateCompte(id:String,body:any)
  {
    let url = "http://localhost:8080/compte/maj/"+id;
    return this.http.put(url,body,{ headers:this.headers_object })
  }
  updateImg(body:any,id:any)
  {
    let url = "http://localhost:8080/compte/majPhoto/"+id;
    return this.http.post(url,body,{ headers:this.headers_object })
  }
  getImg(id:any)
  {
    let url = "http://localhost:8080/compte/getPhoto/"+id;
    return this.http.get(url,{ headers:this.headers_object });
  }
}
