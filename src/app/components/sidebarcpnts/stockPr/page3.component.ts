
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  libelleExiste=false;


 

  constructor(
    public dialog: MatDialog,
    private stock:StockPrService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qte="1";
  }
  verifLibelle()
  {
    if (this.libellePr.length<=0)
    this.libelleExiste=false
    else
    this.libelleExiste=true
      /* console.log(this.libelleExiste) */
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
     if(this.listOfPr.length==0)
        {
          this.loading = false;
          this._snackBar.open(
            "Référence ou libelle incorrecte !", "", {
            verticalPosition: 'top',
            panelClass: 'red-snackbar',
            duration: 5000,
          });
        }
    }, (error) => {
      this.loading = false;
      this._snackBar.open(
        ""+error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    }); }
    addLine(pr:any,result:any)
    {
      let vin="";
      let numOr="";
      let nomClient="";
      let typeCmd=0
      if(pr.stock<0)
       typeCmd=1;

      if(result)
       { vin=result.vin;
        numOr=result.numOR;
        nomClient=result.nomClient;
        typeCmd=1
      }
      let body=
      {
        "editMode":0,
        "numLigne":0,
        "dealerNumber":pr.codeSte,
        "codeArt":pr.codeArt,
        "libelle":pr.libelle,
        "qte":this.qte,
        "pu":parseInt(pr.pu),
        "type_Cmd":typeCmd,
        "vin":vin,
        "numInterv":numOr,
        "nomClient":nomClient
      }
    this.stock.addLineCmd(body).subscribe((response: any)=>{
       /*  this.listOfPr.splice(index, 1) */
        this._snackBar.open(
          response.retMsg, "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        })
    },(error) => {
      this.loading = false;
      this._snackBar.open(
        ""+error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
    }
  /**Cammande Ferme Dialog***/
  cmdFermeDialog(pr:any): void {
    const dialogRef = this.dialog.open(DialogCommandeFerme, {
      width: '640px',
      height: '250px',
      data:pr
    });
    dialogRef.afterClosed().subscribe((result: String)=>{
      if(result)
      {
        this.addLine(pr,result)
      }
    })
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
    this.dialogRef.close(null);
  }
  add(): void {
    let json={
      "vin":this.vin,
      "numOr":this.numOr,
      "nomClient":this.nomClient
    }
    this.dialogRef.close(json);
  }
  

}

