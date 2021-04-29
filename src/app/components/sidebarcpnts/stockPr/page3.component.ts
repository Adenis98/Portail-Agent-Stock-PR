import { DevisService } from './../../../services/stockPr/devis.service';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PanierService } from 'src/app/services/Panier/panier.service';
import { StockPrService } from 'src/app/services/stockPr/stock-pr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
export interface StockLocak {
  "qte": number,
  "codeArt": string,
  "libelle": string,
  "puAgents": number,
  "tauxRemis": number,
  "totLigneHT": number,
  "action": null,
}
@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('consulterStockAnim', [
      transition('* => void', animate('0.3s 0.2s ease-in',
        style([{ transform: 'translateX(10%)', opacity: 0 }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-30%)', opacity: 0 }])
          , animate('0.4s 0.4s ease-out'
          )]
      )
    ]),
    trigger('chariotStock', [
      transition('void => *',
        [style([{ transform: 'translateX(-1500%)', opacity: 0 }])
          , animate('3s 0.4s ease-out'
          )]
      )
    ]),
  ],
})

export class Page3Component implements OnInit {
  data: any = []
  displayedColumns: string[] = ['codeArt', 'libelle', 'puAgents', 'qte', 'tauxRemis', 'totLigneHT', 'action'];
  dataSource: MatTableDataSource<StockLocak> = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadingListe = false;
  loading = false;
  qte = "1";
  refPr: String = "";
  libellePr = "";
  listOfPr: any = [];
  libelleExiste = false;
  isDevis = false;
  totRemis = 0; totTaxes = 0; totalTtc = 0;
  TVA = "10";
  tauxRemis = "0";
  addDevis: boolean = true;
  totLiggneHT: number = 0;
  nomClient: any;
  idFiscale: any;
  timbre = 0.6;
  loadingListeDevis: boolean = false;
  totalHt: any;
  constructor(
    public dialog: MatDialog,
    private stock: StockPrService,
    private _snackBar: MatSnackBar,
    private panier: PanierService,
    private devis: DevisService,
    public datepipe: DatePipe,
  ) {

  }

  ngOnInit(): void {
    this.qte = "1";
  }
  verifLibelle() {
    if (this.libellePr.length <= 0)
      this.libelleExiste = false
    else
      this.libelleExiste = true
  }

  addQte() {
    this.qte = (parseInt(this.qte) + 1).toString();
  }
  removeQte() {
    if (parseInt(this.qte) > 1)
      this.qte = (parseInt(this.qte) - 1).toString();
  }
  afficherSnackBar() {
    this._snackBar.open(
      "Choissez une quantité '<' ou '=' au stock disponible", "", {
      verticalPosition: 'top',
      panelClass: 'red-snackbar',
      duration: 5000,
    });
  }
  getStock() {
    this.qte = "1";
    this.tauxRemis = "0";
    this.loading = true;
    this.loadingListe = true;
    let body =
    {
      "codeArt": this.refPr,
      "libelle": this.libellePr
    }
    this.stock.getStockPr(body).subscribe(response => {
      this.loadingListe = false;
      this.loading = false;
      this.listOfPr = [];
      setTimeout(() => {
        this.listOfPr = response;
      }, 200);
    }, (error) => {
      this.loadingListe = false;
      this.loading = false;
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    });
  }
  addLine(pr: any, result: any) {
    let vin = "";
    let numOr = "";
    let nomClient = "";
    let typeCmd = 0;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    if (result) {
      vin = result.vin;
      numOr = result.numOr;
      nomClient = result.nomClient;
      typeCmd = result.type_Cmd;
    }
    let pu: number = +pr.pu
    let body =
    {
      "editMode": 0,
      "numLigne": 0,
      "dealerNumber": dNbr,
      "codeArt": pr.codeArt,
      "libelle": pr.libelle,
      "qte": this.qte,
      "pu": pu,
      "type_Cmd": typeCmd,
      "vin": vin,
      "numInterv": numOr,
      "nomClient": nomClient
    }
    this.stock.addLineCmd(body).subscribe((response: any) => {
      this._snackBar.open(
        response.retMsg, "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 5000,
      });
      this.getPanierSize();
    }, (error) => {
      this.loading = false;
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  /**Cammande Ferme Dialog***/
  cmdFermeDialog(pr: any): void {
    const dialogRef = this.dialog.open(DialogCommandeFerme, {
      width: '640px',
      height: '250px',
      data: pr,
    });
    dialogRef.afterClosed().subscribe((result: String) => {
      if (result)
        this.addLine(pr, result);
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

  getPanierSize() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    this.panier.getPanierSize(dNbr).subscribe((data: any) => {
      this.panier.setPanierSizeAttr(data);
    });
  }
  anableDevis() {
    this.isDevis = !this.isDevis
    if (localStorage.devis) {
      this.resetDevis();
      this.calucleDevis();
    }
  }

  addToDevis(pr: any) {
    let remis = 0;
    let taxe = 0
    let totTtc = 0;
    let dateCreation: any;
    if (this.data.length == 0) {
      dateCreation = new Date(Date.now());
    }
    else{
      dateCreation=this.data[0].dateCreation;
    }
    remis = (parseInt(this.qte) * pr.pu) * (parseInt(this.tauxRemis) / 100);
    totTtc = (parseInt(this.qte) * pr.pu) * (1 - (parseInt(this.tauxRemis) / 100) * (1 + parseInt(this.TVA) / 100))
    taxe = (parseInt(this.qte) * pr.pu) * (1 - (parseInt(this.tauxRemis) / 100) * (parseInt(this.TVA) / 100));
    this.totLiggneHT = (parseInt(this.qte) * pr.pu) * (1 - parseInt(this.tauxRemis) / 100);
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].codeArt == pr.codeArt) {
        this._snackBar.open(
          "Article deja existe !", "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
        return false;
      }
    }
    this.data.unshift({
      "dateCreation": this.datepipe.transform(dateCreation, 'yyyy-MM-dd HH:mm'),
      "qte": this.qte,
      "codeArt": pr.codeArt,
      "libelle": pr.libelle,
      "puAgents": pr.pu,
      "tauxRemis": parseInt(this.tauxRemis),
      "totLigneHT": this.totLiggneHT,
      "remis": remis,
      "totTtc": totTtc,
      "taxe": taxe
    });
    localStorage.setItem('devis', JSON.stringify(this.data))
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calucleDevis();
    return true
  }
  delete(index: number) {
    this.data.splice(index, 1);
    localStorage.setItem('devis', JSON.stringify(this.data));
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.calucleDevis;
  }
  resetDevis() {
    const retrievedObject: any = localStorage.getItem('devis')
    this.data = JSON.parse(retrievedObject)
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addTaux() {
    if (parseInt(this.tauxRemis) < 100)
      this.tauxRemis = "" + (parseInt(this.tauxRemis) + 1);
  }
  removeTaux() {
    if (parseInt(this.tauxRemis) > 0)
      this.tauxRemis = "" + (parseInt(this.tauxRemis) - 1);
  }
  calucleDevis() {
    let remis = 0;
    let taxe = 0;
    let totTtc = 0;
    let totHT = 0;
    for (let i = 0; i < this.data.length; i++) {
      remis = remis + this.data[i].remis;
      taxe = taxe + this.data[i].taxe;
      totTtc = totTtc + this.data[i].totTtc;
      totHT = totHT + this.data[i].totLigneHT;
    }
    this.totRemis = remis;
    this.totTaxes = taxe;
    this.totalTtc = totTtc;
    this.totalHt = totHT;

  }
  passerDevis() {
    this.loadingListeDevis = true;
    let save = this.data;
    this.data = [];
    this.dataSource = new MatTableDataSource(this.data);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];

    let list: any = [];
    let totRemis = 0;
    let totTaxes = 0;
    for (let i = 0; i < save.length; i++) {
      list.unshift({ "codArt": "" + save[i].codeArt, "qte": save[i].qte })
      totRemis = totRemis + (parseInt(save[i].qte) * save[i].puAgents * (save[i].tauxRemis / 100));
      totTaxes = totTaxes + (parseInt(save[i].qte) * save[i].puAgents * (1 - save[i].tauxRemis / 100));
    };

    let body = {
      "dateCreation":new Date(save[0].dateCreation),
      "dealerNbr": dNbr,
      "nomClient": this.nomClient,
      "idFisc": this.idFiscale,
      "toRemise": totRemis,
      "totHt": this.totalHt,
      "toTaxes": this.totTaxes,
      "timbre": this.timbre,
      "listeArt": list,
      "totTtc": this.totalTtc
    }


    this.devis.addDevis(body).subscribe((respons: any) => {
      this.loadingListeDevis = false
      this.data = [];
      if (!respons.insertionError) {
        let dataImp = {
          "dealerNbr": dNbr,
          "nomClient": this.nomClient,
          "idFisc": this.idFiscale,
          "toRemise": totRemis,
          "toTaxes": this.totTaxes,
          "timbre": this.timbre,
          "listeArt": save,
          "totalTtc": this.totalTtc,
          "numDevis": respons.numDevis,
          "dateCreation": respons.dateCreation
        };
        this.printDevis(dataImp);
        this._snackBar.open(
          "Devis Enregistreée ✔", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        });
        localStorage.removeItem('devis');
      }
      else {
        this._snackBar.open(
          "Echec ✘ ", "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
        this.data = save;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    }, (error) => {
      this.loadingListeDevis = false;
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
      this.data = save;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }
  printDevis(devis: any): void {
    const dialogRef = this.dialog.open(DialogImpression, {
      width: '640px',
      height: '180px',
      data: devis
    });
    /*    dialogRef.afterClosed().subscribe((result: String) => {
         if (result)
         
       }) */
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogCommandeFerme {
  /*****************Command Ferme Inpuet **********/
  vin = "";
  numOr = "";
  nomClient = "";
  selectedOption: String = "";
  hideInputV = false;
  disableInpute = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCommandeFerme>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.stock == -1) {
      this.selectedOption = "1"
      this.hideInputV = true;
      this.disableInpute = true;
    }

  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  add(): void {

    let json = {
      "vin": this.vin,
      "numOr": this.numOr,
      "nomClient": this.nomClient,
      "type_Cmd": this.selectedOption
    }
    this.dialogRef.close(json);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-impression.html',
  styleUrls: ['dialog-impression.css']
})
export class DialogImpression {
  /*****************Devis print **********/
  listDevis: any = [];
  nomClient: any;
  timbre = 0.6;
  toRemise: any;
  toTaxes: any;
  totalTtc: any;
  idFiscal: any;
  numDevis: any;
  dateCreation: any;
  constructor(
    public dialogRef: MatDialogRef<DialogCommandeFerme>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.listDevis = this.data.listeArt;
    this.totalTtc = this.data.totalTtc;
    this.nomClient = this.data.nomClient;
    this.toRemise = this.data.toRemis;
    this.toTaxes = this.data.toTaxes;
    this.numDevis = this.data.numDevis
    this.dateCreation = this.data.dateCreation;
    this.idFiscal = this.data.idFisc;
  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }

  add(): void {
    console.log(this.listDevis)
  }
}
