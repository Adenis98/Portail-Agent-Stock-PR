import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  headers_object: any;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  };
  getNbrCmdStockFerme()
  {
    let url = "http://localhost:8080/stat/NbrCmdStockFerme";
    return this.http.get(url, { headers:this.headers_object });
  }
  getCmdByStatus()
  {
    let url = "http://localhost:8080/stat/CmdLivEnrgFact";
    return this.http.get(url, { headers:this.headers_object });
  }
}

