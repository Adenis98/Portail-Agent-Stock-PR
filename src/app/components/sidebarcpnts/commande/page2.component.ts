import { CommandeService } from './../../../services/commande/commande.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  animations: [
    trigger('ligneCommandAnim', [
      transition('* => void', animate('0.5s 0.2s ease-in',
        style([{ transform: 'translateX(200%)' }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-200%)', opacity: '0' }])
          , animate('0.5s 0.2s ease-out'
          )]
      )
    ]),
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-20%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger('morDetailAnim', [
      transition(
        '* => void',
        animate(
          '0.3s 0.0s ease-in',
          style([{ transform: 'translateY(-110%)' }, { opacity: 0 }])
        )
      ),
      transition('void => *',
        [
          style([{ transform: 'translateY(-110%)', opacity: 0 }]),
          animate('0.3s 0.0s ease-out')
        ]
      )
    ])
  ]
})
export class Page2Component implements OnInit {
  moreDetailtest: any = [true]
  detailValue: any = [true]
  loading = true;

  /***commande variable***********/
  listeCmd: any = []
  sauvgardListe: any = []

  constructor(private router: Router,
    private commande: CommandeService,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,) {

  }

  ngOnInit(): void {
    this.getListeCmd()

  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  openDetail(index: any) {

    for (let i = 0; i < this.listeCmd.length; i++) {
      if (i != index) {
        this.moreDetailtest[i] = true;
        this.detailValue[i] = true;
      }
    }
    if (!this.detailValue[index]) {
      setTimeout(() => {
        this.moreDetailtest[index] = !this.moreDetailtest[index]
        this.detailValue[index] = true;
      }, 25);

    }
    else {
      this.detailValue[index] = false;
      this.moreDetailtest[index] = !this.moreDetailtest[index];
    }
  }
  openListePr(ref: any) {
    this.router.navigate(['/page2', ref])
  }
  /***************************get liste commande *********************************/
  getListeCmd() {
    if (this.listeCmd.length == 0)
      this.loading = false;
    this.commande.getCmd().subscribe(response => {
      this.listeCmd = response;
      this.listeCmd.reverse();
      this.loading = false;
      this.sauvgardListe = this.listeCmd;
      for (let i = 0; i < this.listeCmd.length; i++) {
        this.moreDetailtest.push(true);
        this.detailValue.push(true);
      }
    })
  }
  /***********************cancel commande***************************/
  openDialog(ref: any): void {
    const dialogRef = this.dialog.open(DialogAnnuler, {
      width: '500px',
      height: '200px',
      data: ref
    });

    dialogRef.afterClosed().subscribe((result: String) => {
      if (result == "true") {
        this.cancelCmd(ref);
      } else if (result == "false") {

      }
    });
  }

  cancelCmd(ref: any) {
    this.commande.cancelCmd(ref).subscribe(response => {
      if (response == 1) {
        this._snackBar.open(
          "La commande «" + ref + "» a été annule avec succès ✓", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        })
        this.getListeCmd()
      }
    })
  }
  /****************filte methode*****************/
  startDate = "";
  endDate = "";
  typeCmd = "";
  numCmd = "";
  statutCmd = "";
  refArt = "";
  VIN = "";
  dateRnageCmd = ""
  isAnnuler:boolean=false;
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  filtre() {
    let listeCmdAux: any = [];
    this.listeCmd = this.sauvgardListe;
    if (this.typeCmd.length || this.statutCmd.length || this.numCmd || this.isAnnuler == true) {
      if(this.typeCmd == '2')
      { 
        listeCmdAux = this.sauvgardListe;
      }
      if (this.typeCmd == '0') {
        for (let i = 0; i < this.listeCmd.length; i++) {
          if (this.listeCmd[i].type_Cmd == 0) {
            listeCmdAux.push(this.listeCmd[i]);
          };
        };
      };
      if (this.typeCmd == '1') {
        for (let i = 0; i < this.listeCmd.length; i++) {
          if (this.listeCmd[i].type_Cmd == 1) {
            listeCmdAux.push(this.listeCmd[i]);
          };
        };
      };
      
      if(this.numCmd.length)
      { 
        if (listeCmdAux.length == 0) {
          for (let i = 0; i < this.listeCmd.length; i++) {
            let numCmd:string=""+this.listeCmd[i].numCde;
            if (numCmd.includes(this.numCmd)) {
              listeCmdAux.push(this.listeCmd[i]);
            };
          };
        }
        else {
          let aux:any = listeCmdAux;
          listeCmdAux = [];
          for (let i = 0; i < aux.length; i++) {
            let numCmd:string=""+aux[i].numCde;
            if (numCmd.includes(this.numCmd)) {
              listeCmdAux.push(aux[i]);
            };
          };
        };
      }
      if(this.isAnnuler==true)
        {
            if(listeCmdAux.length == 0)
            {
              this.listeCmd = this.sauvgardListe;
              for (let i = 0; i < this.listeCmd.length; i++) {
                let ann=this.listeCmd[i].annulee;
                if (ann==1) {
                  listeCmdAux.push(this.listeCmd[i]);
                };
              };
            }
            else
            {
              for (let i = 0; i < listeCmdAux.length; i++) {
                let ann=listeCmdAux[i].annulee;
                if (ann==0) {
                  listeCmdAux.splice(i, 1);
                };
              };
            }
        }
      console.log(this.dateRnageCmd)
     this.listeCmd = listeCmdAux;
    }
    
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogAnnuler {

  constructor(
    public dialogRef: MatDialogRef<DialogAnnuler>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close("false");
  }
  cancel(): void {
    this.dialogRef.close("true");
  }
}
