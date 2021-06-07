import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  headers_object: any;
  constructor(private http: HttpClient) {
 
  };
  getLocalStorageJwt(){
    if (localStorage.getItem("jwt") != null)
      this.headers_object = new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("jwt"));
  }
  getNbrCmdStockFerme()
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/stat/NbrCmdStockFerme";
    return this.http.get(url, { headers:this.headers_object });
  }
  getCmdByStatus()
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/stat/CmdLivEnrgFact";
    return this.http.get(url, { headers:this.headers_object });
  }
  getTop5()
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/stat/Top5";
    return this.http.get(url, { headers:this.headers_object });
  }
  getAllCmdStockFermeMonth()
  {
    this.getLocalStorageJwt();
    let url = "http://localhost:8080/stat/AllCmdStockFermeMonth";
    return this.http.get(url, { headers:this.headers_object });
  }
}

