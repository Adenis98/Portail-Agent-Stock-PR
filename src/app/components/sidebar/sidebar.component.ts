import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

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
    ])
  ]
})
export class SidebarComponent implements OnInit {
  hideSideBar=false;

  public dsh=true ;
  public page2=false;
  public page3=false;
  public page4=false;
  public page5=false;

  private s: Subscription = new Subscription;//buttons border radius onPageLoad 
  
  constructor(@Inject(DOCUMENT) private document: Document,private router : Router) { }

  ngOnInit(): void {
    this.document.body.classList.add('paddingBody');//ajouter le padding au body si le sideBar est ouvert

    this.s = this.router.events.subscribe(val => {
      this.dash(location.pathname.substring(1));
      this.s.unsubscribe();
    });
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
    if(current=="dashboard")
    {
      console.log(current);
      this.dsh=true;
      this.page2=this.page3=this.page4=this.page5=false;
    }
    if(current=="page2")
    {
      this.page2=true;
      this.dsh=this.page3=this.page4=this.page5=false;
    }
    if(current=="page3")
    {
      this.page3=true;
      this.dsh=this.page2=this.page4=this.page5=false;
    }
    if(current=="page4")
    {
      this.page4=true;
      this.dsh=this.page2=this.page3=this.page5=false;
    }
    if(current=="page5")
    {
      this.page5=true;
      this.dsh=this.page2=this.page3=this.page4=false;
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
}
