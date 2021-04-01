import { error, logging } from 'protractor';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockPrService } from 'src/app/services/stockPr/stock-pr.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css'],
  animations: [
    trigger('consulterStockAnim', [
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
export class Page3Component implements OnInit {
  loading=false;
  qte:string="";
  refPr:String="";
  libellePr="";
  listOfPr:any=[];
  private _snackBar: any;

 

  constructor(
    public dialog: MatDialog,
    private stock:StockPrService
  ) {}

  ngOnInit(): void {
    this.qte="1";
  }

  addQte()
  {
    this.qte=(parseInt(this.qte)+1).toString();
  }
  removeQte()
  {
    if(parseInt(this.qte)>1)
    this.qte=(parseInt(this.qte)-1).toString();
  }
  getStock()
  {
    this.loading=true;
    let body=
      {
        "codeArt":this.refPr,
        "libelle": this.libellePr
      }
    
    this.stock.getStockPr(body).subscribe(response=>{
      this.loading=false;
      this.listOfPr=response;
    }, erreur => {
      this.loading = false;
      this._snackBar.open(
        "echec d'ajout de l'utilisateur , message d'erreur :"+erreur.erreur.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    }); }
  /**Cammande Ferme Dialog***/
  cmdFermeDialog(pr:any): void {
    const dialogRef = this.dialog.open(DialogCommandeFerme, {
      width: '640px',
      height: '250px',
    });
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogCommandeFerme {
   /*****************Command Ferme Inpuet **********/
   vin="";
   numOr="";
   nomClient="";

  constructor(
    public dialogRef: MatDialogRef<DialogCommandeFerme>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  onNoClick(): void {
    this.dialogRef.close("false");
  }
  delete(): void {
    this.dialogRef.close("true");
  }

}

