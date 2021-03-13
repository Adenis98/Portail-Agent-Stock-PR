
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'hello';
  public showNavSide=false;
  constructor(){
    if(localStorage.getItem("jwt")!=null)
      this.showNavSide=true; 
  }
}


