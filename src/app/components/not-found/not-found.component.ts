import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router :Router) { }
  back=false;
  deleteElmnt=true;
  ngOnInit(): void {
    if(localStorage.getItem("jwt")==null)
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
