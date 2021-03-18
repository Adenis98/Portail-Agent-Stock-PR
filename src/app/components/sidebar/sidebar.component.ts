import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AppComponent} from "../../app.component" ; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations:[
    trigger('sideNavFade',[
      transition('void => *',
        [
          style({transform :'translateX(-300px)' })
          ,animate('0.5s 0.7s ease-out')
        ]
      )
    ]),
  ]
})
export class SidebarComponent implements OnInit {

  userNameDash = "BOT";
  hideSideBar=false;
  public dsh=false ;
  public page2=false;
  public page3=false;
  public page4=false;
  public page5=false;
  public comptes=false

  private s: Subscription = new Subscription;//buttons border radius onPageLoad 
  
  constructor(@Inject(DOCUMENT) private document: Document,
              private router : Router,
              private auth :AuthService , 
              private appCmp:AppComponent){
                router.events.subscribe((val)=>{
                  if(val instanceof NavigationEnd)
                    this.dash(val.url.substring(1));
                })
              }

  ngOnInit(): void {
    this.document.body.classList.add('paddingBody');//ajouter le padding au body si le sideBar est ouvert

    //style the buttons if other button is selected 
    this.s = this.router.events.subscribe(val => {
      this.dash(location.pathname.substring(1));
      this.s.unsubscribe();
    });


    this.setUsername();


    if(this.router.url =="/dashboard")
      this.dsh=true;
  }
  
  sideBarToggeleClicked()
  {
    if(this.hideSideBar==false)
    {
      this.document.body.classList.add('paddingBody');
      this.document.body.classList.remove('removePaddingBody');
    }
    else
    {
      this.document.body.classList.add('removePaddingBody');
      this.document.body.classList.remove('paddingBody');
    } 
  }
  
  dash(current:any)
  {    
    //if button is clicked and the JWT localstorage is null then redirect to sign in page
    if(localStorage.getItem("jwt")==null)
      this.logOut();
      
    if(current=="dashboard")
    {
      this.dsh=true;
      this.page2=this.page3=this.page4=this.page5=this.comptes=false;
    }
    if(current=="page2")
    {
      this.page2=true;
      this.dsh=this.page3=this.page4=this.page5=this.comptes=false;
    }
    if(current=="page3")
    {
      this.page3=true;
      this.dsh=this.page2=this.page4=this.page5=this.comptes=false;
    }
    if(current=="page4")
    {
      this.page4=true;
      this.dsh=this.page2=this.page3=this.page5=this.comptes=false;
    }
    if(current=="page5")
    {
      this.page5=true;
      this.dsh=this.page2=this.page3=this.page4=this.comptes=false;
    }
    if(current=="comptes")
    {
      this.comptes=true;
      this.dsh=this.page2=this.page3=this.page4=this.page5=false;
    }
  }

  avatar:string ="../../../assets/image/avatar.jpg";

  inputFunction()
  {
    let bt=<HTMLInputElement>document.getElementById("shoseImage");
    bt.click();
  }
  inputFunctionValue(file:any)
  {
    //let bt=(<HTMLInputElement>document.getElementById("shoseImage")).value;
    console.log("ramez",file.files[0]);
    /*his.imageService
        .getBase64(file[0])
        .subscribe(str => this.profilePicture = str);*/
  }
  setUsername()
  {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    this.userNameDash=decodedToken["sub"];
  }
  logOut()
  {
    setTimeout(()=>{
      this.router.navigate(["/login"]);
      //clear the local storage
      this.auth.logout();
    },400)
   
    //delete the padding body class from the body
    this.document.body.classList.remove('paddingBody');
    this.document.body.classList.remove('removePaddingBody');
    //hide the sideNav 
    this.appCmp.showNavSide=false; 
    
   
  }
}
