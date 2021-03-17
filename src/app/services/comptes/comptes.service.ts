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
  deleteCompte(data:any)
  {

    let url = "http://localhost:8080/compte/supprimer"
    return this.http.delete(url+'/'+ data.code, { headers:new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt")) }).subscribe(Response=>{console.log(Response)})
  }
  
}
