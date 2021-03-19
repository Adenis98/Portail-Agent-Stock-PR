import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetcomptesService {

  public headers_object ;
  constructor(private http: HttpClient) {
    if(localStorage.getItem("jwt")!=null)
      this.headers_object = new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt"));
   }

  getComptes() {
    let url = "http://localhost:8080/compte/avoirTout";
    return this.http.get(url, { headers:this.headers_object });
  }
  deletCompt(compt:any)
  {
    let url = "http://localhost:8080/compte/supprimer/"+compt.code;
    return this.http.delete(url, { headers:this.headers_object });
  }
  addCompt(body:any)
  {
    let url = "http://localhost:8080/compte/ajout"
    return this.http.post(url,body,{headers:this.headers_object})
  }
  
}
