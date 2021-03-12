import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  login()
  {
    let body = {username : "ramez" , password : "zormati"} ; 
    
    this.http.post("http://localhost:8080/authenticate",body)
    .subscribe(resp=>{
      console.log(resp);
    });
  }
}
