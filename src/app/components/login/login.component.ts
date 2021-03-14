import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component'
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginFade', [
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
export class LoginComponent implements OnInit {
  hide = true;
  showLoginBox = true;
  loading = false;
  public user = "";
  public psd = "";
  private token: any = [];

  constructor(private log: AuthService, private _snackBar: MatSnackBar, private app: AppComponent, private router: Router) { }
  ngOnInit(): void {
    
  }
  sendRequest() {
    this.loading = true;
    this.log.login(this.user, this.psd).subscribe(resp => {
      this.loading = false;
      this.token = resp;
      localStorage.setItem("jwt", this.token.jwt);
      this.showLoginBox = !this.showLoginBox;
      this._snackBar.dismiss();
      this.app.showNavSide = true;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);

    }, (error) => {

      this.loading = false;
      console.log(error);
      this._snackBar.open(
        (error.status==0)?"connexion au serveur impossible !!":error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'blue-snackbar'
      });
    });
  }

}
