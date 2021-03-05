import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  hideSideBar=false;
  constructor(@Inject(DOCUMENT) private document: Document,private router:Router) { }

  ngOnInit(): void {
    this.document.body.classList.add('paddingBody');
  }
  avatar:string ="../../../assets/image/avatar.jpg";
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
  public dsh=false ;
  public page2=false;
  public page3=false;
  public page4=false;
  public page5=false;
  dash(current:any)
  {    
    if(current=="dashboard")
    {
      this.dsh=true;
      this.page2=this.page3=this.page4=this.page5=false;
    }
    if(current=="commande")
    {
      this.page2=true;
      this.dsh=this.page3=this.page4=this.page5=false;
    }
    if(current=="pr")
    {
      this.page3=true;
      this.dsh=this.page2=this.page4=this.page5=false;
    }
    if(current=="agent")
    {
      this.page4=true;
      this.dsh=this.page2=this.page3=this.page5=false;
    }
    if(current=="local")
    {
      this.page5=true;
      this.dsh=this.page2=this.page3=this.page4=false;
    }
  }
}
