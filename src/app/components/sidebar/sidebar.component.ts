import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  hideSideBar=false;
  constructor(@Inject(DOCUMENT) private document: Document) { }

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
}
