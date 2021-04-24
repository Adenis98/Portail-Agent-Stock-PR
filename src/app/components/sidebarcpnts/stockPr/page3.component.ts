
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PanierService } from 'src/app/services/Panier/panier.service';
import { StockPrService } from 'src/app/services/stockPr/stock-pr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface StockLocak {
  "qte": number,
  "codArt": string,
  "libelle": string,
  "puAgents": number
}
@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css'],
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
  ]
})

export class Page3Component implements OnInit {
  data: any = []
  displayedColumns: string[] = ['refArt', 'libelle', 'pu', 'qte'];
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

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  addDevis: boolean=true;
  constructor(
    public dialog: MatDialog,
    private stock: StockPrService,
    private _snackBar: MatSnackBar,
    private panier: PanierService
  ) { }

  ngOnInit(): void {
    this.qte = "1"
  }
  verifLibelle() {
    if (this.libellePr.length <= 0)
      this.libelleExiste = false
    else
      this.libelleExiste = true
    /* console.log(this.libelleExiste) */
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
        "" + error.error.message, "", {
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
        "" + error.error.message, "", {
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
  }
  addToDevis(pr: any) {
    for(let i=0;i<this.data.length;i++)
    {
      if(this.data[i].codArt==pr.codArt)
      {
        this._snackBar.open(
          "Article deja existe !" , "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
        return false;
      }
    }
    this.data.unshift({
      "qte": this.qte,
      "codArt": pr.codArt,
      "libelle": pr.libelle,
      "puAgents": pr.pu
    });
    console.log(this.data)
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    return true
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


