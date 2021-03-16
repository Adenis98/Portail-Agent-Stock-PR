import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetcomptesService {

  constructor(private http: HttpClient) {
   }

  getComptes() {
    let url = "http://localhost:8080/compte/avoirTout"
    return this.http.get(url, { headers:new HttpHeaders().append("Authorization","Bearer "+localStorage.getItem("jwt")) })
  }
}
