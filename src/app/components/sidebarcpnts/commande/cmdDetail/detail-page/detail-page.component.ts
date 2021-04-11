import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
  animations: [
    trigger('lignePanierAnim', [
      transition('* => void', animate('0.7s 0.2s ease-in',
        style([{ transform: 'translateX(200%)', opacity: 0 }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-200%)', opacity: 0 }])
          , animate('0.5s 0.2s ease-out'
          )]
      )
    ]),
  ]
})
export class DetailPageComponent implements OnInit {

  moreDetailtest: boolean[] = new Array();
  detailValue: boolean[] = new Array();
  listePanier: any = [];
  constructor(private routerinfo:ActivatedRoute,) { }

  ngOnInit(): void {
    let ref = this.routerinfo.snapshot.paramMap.get('ref')
  }
  openDetail(index: any) {
    this.moreDetailtest[index] = !this.moreDetailtest[index]
    if (!this.detailValue[index])
      setTimeout(() => {
        this.detailValue[index] = true;
      }, 400);
    if (this.detailValue[index])
      this.detailValue[index] = !this.detailValue[index];
  }
}
