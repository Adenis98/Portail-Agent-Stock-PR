import { CommandeService } from './../../../services/commande/commande.service';
import { PanierService } from './../../../services/Panier/panier.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css'],
  animations: [
    trigger('lignePanierAnim', [
      transition('* => void', animate('0.3s 0.2s ease-in',
        style([{ transform: 'translateX(50%)', opacity: 0 }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-50%)', opacity: 0 }])
          , animate('0.3s 0.2s ease-in'
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
  loadingBtn=false;
  loadingListe=false;

  /***********forminput*************/
  disableBlock = false;
  refCommande = "";
  modePaiment = "";
  typeCommande = "";
  dateDeCommande = new Date();
  constructor(
    private commande: CommandeService,
    public datepipe: DatePipe,
    private panier: PanierService,
    private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    this.getPanier()
    setTimeout(() => {
      this.verifPanierVide()
    }, 400);
    //this.minDate=this.DatePipe.transform(this.minDate,'yyyy-MM-dd')
  }
  verifPanierVide() {
    if (this.listePanier.length > 0) {
      this.disableBlock = true;
    }
    else {
      this.disableBlock = false;
    }
  }

  openDetail(index: any) {
    if (!this.detailValue[index]) {
      this.moreDetailtest[index] = true;
      setTimeout(() => {
        this.detailValue[index] = this.moreDetailtest[index];
      }, 200);
    }
    if (this.detailValue[index]) {
      this.moreDetailtest[index] = false;
      this.detailValue[index] = this.moreDetailtest[index];
    }
  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  /* ************get panier item*************** */
  getPanier() {
    this.loadingListe=true;
    this.panier.getPanierItem().subscribe((data: any) => {
      this.loadingListe=false;
      this.listePanier = data.lignesPanier
      this.totHT = this.formatMoney(data.totHt)

      for (let i = 0; i < this.listePanier.length; i++) {
        this.moreDetailtest.push(false)
        this.detailValue.push(false)
        this.qte.push(this.listePanier[i].qte)
      }
      this.verifPanierVide();
      
    },(error)=>{
      this.loadingListe = false;
      this._snackBar.open(
        "" + error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  /* ****************delet ligne Panier****************** */
  deletLigne(ref: any, index: any) {
    this.panier.deletLignePanier(ref).subscribe(response => {
      this.panier.getPanierItem().subscribe((data: any) => {
        this.totHT = this.formatMoney(data.totHt)
      })
      /*  this.totHT=this.totHT-((this.listePanier[index].pu)*this.listePanier[index].qte) */
      this.listePanier.splice(index, 1)
      this._snackBar.open(
        response + "✓", "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 5000,
      });
      this.getPanierSize();
    }, (error) => {
      this._snackBar.open(
        "" + error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    }
    )
  };
  /************************passer une commande**********************/
  commander() {
    this.loadingBtn=true
    let dateS = this.datepipe.transform(this.dateDeCommande, 'yyyy-MM-dd');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    let body = {
      "typeCmd": parseInt(this.typeCommande),
      "modePaiement": this.modePaiment,
      "refCmd": this.refCommande.toUpperCase(),
      "dateLivS": dateS,
      "dealerNumber": dNbr
    }
    this.commande.passerCmd(body).subscribe((response: any) => {
      this.loadingBtn=false
      if (response == 1) {
        this._snackBar.open(
          "commande passer avec succès  ✓", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        });
        this.getPanier();
      }
      if (response == 0) {
        this._snackBar.open(
          "S'il vous plaît vérifier le choix de type commande", "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });

      }
    })
  }
  getPanierSize()
  { 
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    this.panier.getPanierSize(dNbr).subscribe((data:any)=>{
      this.panier.setPanierSizeAttr(data);
      console.log('DATA ******* '+data);
    });
  }

}
