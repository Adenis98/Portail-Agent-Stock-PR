import { Label } from 'ng2-charts';
import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  newList:any ; 
  numPage:number=1;
  loadingList = false;
  nomClient = "";
  idFisc = "";
  numDevisInput = "";
  isArchiver :boolean=false;
  loadingRecherchBtn = false;
  sauvgardListe: any;
  constructor(private router: Router,
    private devis: DevisService,
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('devisArch')=='true')
    {
      this.isArchiver=true;
      this.getDevis();
    }
    else{
      this.getDevis();
      this.isArchiver=false
    }
  }
  getDevis() {
    this.loadingList = true;
    let arch= "0"
    if(this.isArchiver==false)
     {arch="0"}
    else
      {arch="1"}
    
    this.devis.getDevis(arch).subscribe((respons: any) => {
      this.loadingList = false;
      this.listeDevis = respons.reverse();
      this.sauvgardListe = this.listeDevis;

      if (localStorage.saveListFilter) {
        this.resetValue()
        this.filtre()
        localStorage.removeItem('saveListFilter');
      }
      this.initialiserNewList();
    }, (error) => {
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
    let filterData: any = {
      "nomClient":this.nomClient,
      "idFisc":this.idFisc,
      "numDevisInput":this.numDevisInput
    }
    if (this.nomClient || this.idFisc || this.numDevisInput ) {
      localStorage.setItem('saveListFilter', JSON.stringify(filterData))
    }
  }
  resetValue() {
    const retrievedObject: any = localStorage.getItem('saveListFilter')
    let filterData = JSON.parse(retrievedObject)
    this.nomClient = filterData.nomClient;
    this.idFisc=filterData.idFisc;
    this.numDevisInput=filterData.numDevisInput;
  }
  devisArch()
  {
    this.isArchiver=!this.isArchiver
    localStorage.setItem('devisArch', ""+this.isArchiver)
  }
  filtre() {
    let listeDevisAux: any = [];
    this.listeDevis = this.sauvgardListe;
    if (this.nomClient || this.idFisc || this.numDevisInput ) {
      let passIn = false;    
      if (this.nomClient.length) {
        if (listeDevisAux.length == 0) {
          for (let i = 0; i < this.listeDevis.length; i++) {
            if (this.listeDevis[i].nomClient.includes(this.nomClient)) {
              listeDevisAux.push(this.listeDevis[i]);
              passIn = true;
            };
          };
        }
        else {
          for (let i = 0; i < listeDevisAux.length; i++) {
            if (!this.listeDevis[i].nomClient.includes(this.nomClient)) {
              listeDevisAux.splice(i, 1)
              passIn = true;
            };
          };
        };
      }

      if (this.idFisc.length) {
        if (listeDevisAux.length == 0 && passIn) {
          for (let i = 0; i < this.listeDevis.length; i++) {
            if (this.listeDevis[i].idFisc.includes(this.idFisc)) {
              listeDevisAux.push(this.listeDevis[i]);
              passIn = true;
            };
          };
        }
        else {
          let aux = listeDevisAux
          listeDevisAux = []
          for (let i = 0; i < aux.length; i++) {
            if (aux[i].idFisc.includes(this.idFisc)) {
              listeDevisAux.push(aux[i]);
              passIn = true;
            };
          };
        };
      }
      if (this.numDevisInput.length) {
        if (listeDevisAux.length == 0 && passIn) {
          for (let i = 0; i < this.listeDevis.length; i++) {
            let numDevis = "" + this.listeDevis[i].numDevis
            if (numDevis.includes(this.numDevisInput)) {
              listeDevisAux.push(this.listeDevis[i]);
              passIn = true;
            };
          }
        }
        else {
          let aux = listeDevisAux;
          listeDevisAux = [];
          for (let i = 0; i < aux.length; i++) {
            let numDevis = aux[i].numDevis.toString()
            if (numDevis.includes(this.numDevisInput)) {
              listeDevisAux.push(aux[i]);
              passIn = true;
            };
          };
        }
      }
    }
    else {
      listeDevisAux = this.sauvgardListe;
    }
    this.listeDevis = listeDevisAux;
    this.initialiserNewList();
  }
  openDialog(ref: any): void {
    const dialogRef = this.dialog.open(DialogAnnulerDevis, {
      width: '500px',
      height: '190px',
      data: ref
    });

    dialogRef.afterClosed().subscribe((result: String) => {
      if (result == "true") {
        this.cancelDevis(ref);
      } else if (result == "false") {
      }
    }, (error) => {
      this.loadingList = false;
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    });
  }

  cancelDevis(ref: any) {
    this.devis.cancelDevis(ref).subscribe(response => {
      if (response == 1) {
        this._snackBar.open(
          "Le Devis «" + ref + "» a été annule avec succès ✓", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        })
        this.getDevis()
      }
    }, (error) => {
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  initialiserNewList()
  {
    this.newList= new Array();
    let i : number ; 
    for(i = 0 ; i<10&&i<this.listeDevis.length; i++)
    {
      let val = this.listeDevis[i] ; 

      this.newList.push(Object.assign({}, val));
    }
    this.numPage = 1 ; 
  }
  pageSuiv()
  {
    let i : number ; 
    this.newList= new Array();
    for(i = (this.numPage*10) ; i< this.listeDevis.length && i<=(this.numPage*10)+10 ; i++)
    {
      let val = this.listeDevis[i] ; 
      this.newList.push(Object.assign({}, val));
    }
    this.numPage++;    
  }

  pagePrec()
  {
    let i : number ; 
    this.newList= new Array();
    for(i = (this.numPage*10)-20 ; i<(this.numPage*10)-10; i++)
    {
      let val = this.listeDevis[i] ; 
      this.newList.push(Object.assign({}, val));
    }
    this.numPage--;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogAnnulerDevis {

  constructor(
    public dialogRef: MatDialogRef<DialogAnnulerDevis>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close("false");
  }
  cancel(): void {
    this.dialogRef.close("true");
  }
}