import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css'],
  animations: [
    trigger('lignePanierAnim', [
      transition('* => void', animate('0.7s 0.2s ease-in',
        style([{ transform: 'translateX(200%)' }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-200%)' }])
          , animate('0.5s 0.2s ease-out'
          )]
      )
    ]),
  ]
})
export class Page4Component implements OnInit {
  qte:string=""
  moreDetail=false;
  detailValue=false;
  startDate="10/06/2012"
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
  openDetail()
  {
    this.moreDetail=!this.moreDetail
    if(!this.detailValue)
    setTimeout(() => {
      this.detailValue=true;
    }, 400);
    if(this.detailValue)
      this.detailValue=!this.detailValue;
  }
  

}
