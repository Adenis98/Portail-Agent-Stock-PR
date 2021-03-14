import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  animations:[
    trigger('circleShapeFade',[
      transition('* => void',animate('0.7s 0.7s ease-in',
        style({transform :'translateX(400%)' })
        )
      ),
    ]),
    trigger('botShapeFade',[
      transition('* => void',animate('0.7s 0.3s ease-in',
        style({transform :'translateY(200%)' })
        )
      )
    ])
  ],
})
export class AppComponent {
  title = 'hello';
  public showNavSide=false;
  constructor(){
    if(localStorage.getItem("jwt")!=null)
      this.showNavSide=true; 
  }
  public localStrg()//if the JWT is deleted the sideNav will disappear 
  {return localStorage.getItem("jwt")!=null;}
}


