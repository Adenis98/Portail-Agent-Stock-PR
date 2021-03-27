import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {
  qte:string="";
  constructor() { }

  ngOnInit(): void {
    this.qte="1";
  }
  addQte()
  {
    this.qte=(parseInt(this.qte)+1).toString();
  }
  removeQte()
  {
    if(parseInt(this.qte)>1)
    this.qte=(parseInt(this.qte)-1).toString();
  }

}
