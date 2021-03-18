import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

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
      transition('void => *',[
        style({transform :'translateX(400%)'}),
        animate('0.7s 0.7s ease-out')
        ]
      )
    ]),
    trigger('botShapeFade',[
      transition('* => void',animate('0.7s 0.3s ease-in',
        style({transform :'translateY(200%)'})
        )
      ),
      transition(
        'void => *',
        [style({transform :'translateY(200%)'}),animate('0.7s 0.3s ease-out')]
      )
    ])
  ],
})
export class AppComponent {
  title = 'hello';
  public showNavSide=false;
  constructor(public router:Router ,public auth : AuthService){
    if(this.auth.isLoggedIn())
      this.showNavSide=true; 
  }
  public localStrg()//if the JWT is deleted the sideNav will disappear 
  {return localStorage.getItem("jwt")!=null;}
  
}


