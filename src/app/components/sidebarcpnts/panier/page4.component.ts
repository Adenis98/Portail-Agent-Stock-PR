import { PanierService } from './../../../services/Panier/panier.service';
import { StockPrService } from 'src/app/services/stockPr/stock-pr.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  qte: string[] = new Array()
  minDate = new Date(Date.now());
  listePanier: any = [];
  moreDetailtest: boolean[] = new Array();
  detailValue: boolean[] = new Array();
  totHT: any;

  /***********forminput*************/
  refCommande = "";
  modePaiment = "";
  typeCommande = "";
  dateDeCommande = new Date();
  constructor(
    private panier: PanierService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPanier()

    //this.minDate=this.DatePipe.transform(this.minDate,'yyyy-MM-dd')
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
  commander() {
    console.log(this.modePaiment + this.typeCommande + this.refCommande + "********" + this.dateDeCommande.toLocaleString())
  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  getPanier() {
    this.panier.getPanierItem().subscribe((data: any) => {
      this.listePanier = data.lignesPanier
      this.totHT = this.formatMoney(data.totHt)

      for (let i = 0; i < this.listePanier.length; i++) {
        this.moreDetailtest.push(false)
        this.detailValue.push(false)
        this.qte.push(this.listePanier[i].qte)
      }
      /*    console.log(this.listePanier[0].qte)  */
    })
  }
  /* ****************delet ligne Panier****************** */
  deletLigne(ref: any, index: any) {
    this.panier.deletLignePanier(ref).subscribe(response => {
      /*  console.log(response) */
      this.listePanier.splice(index, 1)
      this._snackBar.open(
        response + "✓", "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 5000,
      });
    }, (error) => {
      this._snackBar.open(
        "" + error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    }
    )

  }
}
