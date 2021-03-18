import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [
    trigger('notFoundFade', [
      transition('* => void', animate('0.7s 0.2s ease-in',
        style({ transform: 'translateX(200%)' })
      )
      ),
      transition('void => *',
        [style({ transform: 'translateX(-200%)' })
          , animate('0.7s 0.2s ease-out'
          )]
      )
    ])
  ]
})
export class NotFoundComponent implements OnInit {

  constructor(private router :Router,private auth : AuthService) { }
  back=false;
  deleteElmnt=true;
  ngOnInit(): void {
    if(localStorage.getItem("jwt")==null||!this.auth.isLoggedIn())
      this.back=true ; 
  }
  goBack()
  {
    this.deleteElmnt=false;
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 500);
  }

}
