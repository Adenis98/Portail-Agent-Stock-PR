import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis/devis.service';

@Component({
  selector: 'app-page-devis',
  templateUrl: './page-devis.component.html',
  styleUrls: ['./page-devis.component.css'],
  animations: [

    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-20%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
  ]
})
export class PageDevisComponent implements OnInit {
  listeDevis: any = [];
  loadingList = false;
  nomClient = "";
  idFisc = "";
  numDevisInput = "";
  isArchiver = "";
  loadingRecherchBtn = false;
  sauvgardListe: any;
  constructor(private router: Router,
    private devis: DevisService,
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,) {

  }

  ngOnInit(): void {
    this.getDevis()
  }
  getDevis() {
    this.loadingList = true;
    this.devis.getDevis().subscribe((respons: any) => {
      this.loadingList = false;
      this.listeDevis = respons.reverse();
      this.sauvgardListe = this.listeDevis;
    }
      , (error) => {
        this.loadingList = false;
        this._snackBar.open(
          (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
      })
  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  openDevis(ref: any) {
    this.router.navigate(['/page3', ref])
  }
  filtre() {
    let listeDevisAux: any = [];
    this.listeDevis = this.sauvgardListe;
    if(this.nomClient || this.idFisc||this.numDevisInput)
    {
      let passIn=false
      if (this.nomClient.length) {
        if (listeDevisAux.length == 0) {
          for (let i = 0; i < this.listeDevis.length; i++) {
            if (this.listeDevis[i].nomClient.includes(this.nomClient)) {
              listeDevisAux.push(this.listeDevis[i]);
              passIn=true;
            };
          };
        }
        else
        {
          for (let i = 0; i < listeDevisAux.length; i++) {
            if (!this.listeDevis[i].nomClient.includes(this.nomClient)) {
              listeDevisAux.splice(i,1)
              passIn=true;
            };
          };
        };
      }
  
      if (this.idFisc.length) {
        if (listeDevisAux.length == 0 && passIn) {
          for (let i = 0; i < this.listeDevis.length; i++) {
            if (this.listeDevis[i].idFisc.includes(this.idFisc)) {
              listeDevisAux.push(this.listeDevis[i]);
              passIn=true;
            };
          };
        }
        else
        {
          let aux=listeDevisAux
          listeDevisAux=[]
          for (let i = 0; i < aux.length; i++) {
            if (aux[i].idFisc.includes(this.idFisc)) {
              listeDevisAux.push(aux[i]);
              passIn=true;
            };
          };
        };
      }
      if (this.numDevisInput.length) {
        if (listeDevisAux.length == 0 && passIn) {
          for (let i = 0; i < this.listeDevis.length; i++) {
            let numDevis=""+this.listeDevis[i].numDevis
            if (numDevis.includes(this.numDevisInput)) {
              listeDevisAux.push(this.listeDevis[i]);
              passIn=true;
            };
          }
        }
        else
        {
          let aux=listeDevisAux;
          listeDevisAux=[];
          for (let i = 0; i < aux.length; i++) {
            let numDevis=aux[i].numDevis.toString()
            if (numDevis.includes(this.numDevisInput)) {
              listeDevisAux.push(aux[i]);
              passIn=true;
            };
          };
        }
      }
    }
    else
    {
      listeDevisAux=this.sauvgardListe;
    }
    this.listeDevis=listeDevisAux;
  }
}
