import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  animations: [
    trigger('ligneCommandAnim', [
      transition('* => void', animate('0.7s 0.2s ease-in',
        style([{ transform: 'translateX(200%)' }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-200%)' ,opacity:'0'}])
          , animate('0.5s 0.2s ease-out'
          )]
      )
    ]),
    trigger('morDetailAnim', [
      transition('* => void', animate('0.7s 0.3s ease-in',
        style([{ transform: 'translateY(-110%)' }, {opacity:0 }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateY(-110%)' ,opacity:0}])
          , animate('0.5s 0.3s ease-out'
          )]
      )
    ])
  ]
})
export class Page2Component implements OnInit {
  moreDetailtest:any=[true]
  detailValue:any=[true]
  constructor() { 

  }

  ngOnInit(): void {
  }
  openDetail(index:any)
  {
    this.moreDetailtest[index]=!this.moreDetailtest[index]
    if(!this.detailValue[index])
    setTimeout(() => {
      this.detailValue[index]=true;
    }, 400);
    if(this.detailValue[index])
      this.detailValue[index]=!this.detailValue[index];
  }

}
