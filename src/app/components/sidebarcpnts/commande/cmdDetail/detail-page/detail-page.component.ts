import { logging } from 'protractor';
import { CommandeService } from './../../../../../services/commande/commande.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(20%)', opacity: 0}),
          animate('0.3s', style({transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden'}))
        ])
      ]
    ),
  ]
})
export class DetailPageComponent implements OnInit {

  listePanier: any = [];
  refCmd:any
  loading=false;
  totalQte:Number=0;
  totalQteL:Number=0;
  totalQteF:Number=0;
  totalHT:Number=0;
  
  constructor(private routerinfo:ActivatedRoute,private cmd:CommandeService,private router:Router) { 
 
  }

  ngOnInit(): void {
    let ref = this.routerinfo.snapshot.paramMap.get('ref');
    this.refCmd=ref;
    this.getLigneCmd();
  }
  precedent()
  {
    this.router.navigate(['/page2']);
  };
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  getLigneCmd()
  {
    this.cmd.getCmdLine(this.refCmd).subscribe(response=>{
      this.loading=false;
      this.listePanier=response;
      
      for (let i = 0; i < this.listePanier.length; i++) {
        this.totalQte=this.totalQte+ this.listePanier[i].qte;
        this.totalQteL=this.totalQteL+this.listePanier[i].qteLivree;
        this.totalQteF=this.totalQteF+this.listePanier[i].qteFacturee;
        this.totalHT=this.totalHT+this.listePanier[i].totLigneHt;
      }
    })

  }
}
