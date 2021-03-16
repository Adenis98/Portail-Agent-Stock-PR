import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetcomptesService {

  public headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  constructor(private http: HttpClient) { }

 
  getComptes() {
    let url = "http://localhost:8080/compte/avoirTout"
    return this.http.get(url, { headers: this.headers_object })
  }
}
