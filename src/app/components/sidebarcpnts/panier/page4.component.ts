import { StockPrService } from 'src/app/services/stockPr/stock-pr.service';
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
  qte:string[]=new Array()
  minDate=new Date(Date.now());
  listePanier:any=[];
  moreDetailtest:boolean[] = new Array();
  detailValue:boolean[] = new Array();
  totHT:any;
 
  /***********forminput*************/
  refCommande="";
  modePaiment="";
  typeCommande="";
  dateDeCommande=new Date();
  constructor(private panier:StockPrService) { }

  ngOnInit(): void {
    this.getPanier() 
    
    //this.minDate=this.DatePipe.transform(this.minDate,'yyyy-MM-dd')
  }

  addQte(index:any)
  {
    this.qte[index]=(parseInt(this.qte[index])+1).toString();
  }
  removeQte(index:any)
  {
    if(parseInt(this.qte[index])>1)
    this.qte[index]=(parseInt(this.qte[index])-1).toString();
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
 commander()
 {
  console.log(this.modePaiment+this.typeCommande+this.refCommande+"********"+this.dateDeCommande.toLocaleString())
 }
 formatMoney(x:any)
 {
  const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3
  })
  return(euro.format(x));
 }
 getPanier()
 {
   this.panier.getPanierItem("95").subscribe((data:any)=>{
    this.listePanier=data.lignesPanier
    this.totHT=this.formatMoney(data.totHt)
   
    for(let i=0;i<this.listePanier.length;i++)
      {
        this.moreDetailtest.push(false)
        this.detailValue.push(false)
        this.qte.push(this.listePanier[i].qte)
      }
 /*    console.log(this.listePanier[0].qte)  */
   })
 }

}
