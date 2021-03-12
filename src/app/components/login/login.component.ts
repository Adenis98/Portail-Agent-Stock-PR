import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('loginFade',[
      transition('* => void',animate('0.7s 0.2s ease-in',
        style({transform :'translateX(200%)' })
        )
      ),
      transition('void => *',
      [style({transform :'translateX(-200%)' })
      ,animate('0.7s 0.2s ease-out'
        )]  
      )
    ])
  ]
})
export class LoginComponent implements OnInit {
  hide = true ; 
  showLoginBox = true ; 
  constructor(private log:LoginServiceService) { }
  ngOnInit(): void {
  }
  sendRequest()
  {
    this.log.login();
  }

}
