import { CommandeService } from './../../../services/commande/commande.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  animations: [
   
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
  moreDetailtest: any = [true];
  detailValue: any = [true];
  loading = true;
  loadingRecherchBtn = false;
  valide: boolean = false;
  /***commande variable***********/
  numPage :number =1; 
  newList:any = [];
  listeCmd: any = [];
  sauvgardListe: any = [];
  isArchiver :boolean = false;
  typeCmd = "";
  numCmd = "";
  statutCmd = "";
  refArt = "";
  VIN = "";
  isAnnuler: boolean = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  constructor(private router: Router,
    private commande: CommandeService,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('cmdArch')=='true')
    {
      this.isArchiver=true;
      this.getListeCmd();
    }
    else{
      this.getListeCmd();
      this.isArchiver=false
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
  cmdArch()
  {
    this.isArchiver=!this.isArchiver
    localStorage.setItem('cmdArch', ""+this.isArchiver)
  }
  resetValue() {
    const retrievedObject: any = localStorage.getItem('saveList')
    let filterData = JSON.parse(retrievedObject)
    this.typeCmd = filterData.typeCmd;
    this.numCmd = filterData.numCmd;
    this.statutCmd = filterData.statutCmd;
    this.refArt = filterData.refArt;
    this.VIN = filterData.VIN;
    this.isAnnuler = filterData.isAnnuler;
    this.range.controls['start'].setValue(filterData.dateS);
    this.range.controls['end'].setValue(filterData.dateE);
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
    let filterData: any = {
      "typeCmd": this.typeCmd,
      "numCmd": this.numCmd,
      "statutCmd": this.statutCmd,
      "refArt": this.refArt,
      "VIN": this.VIN,
      "isAnnuler": this.isAnnuler,
      "dateS": this.range.value.start,
      "dateE": this.range.value.end
    }
    if (this.typeCmd.length || this.statutCmd.length || this.statutCmd.length || this.numCmd || this.isAnnuler != false || (this.range.value.start && this.range.value.end) || this.refArt.length || this.VIN.length) {
      localStorage.setItem('saveList', JSON.stringify(filterData))
    }
  }
  /***************************get liste commande *********************************/
  getListeCmd() {
    this.loading = true;
    let arch= "0"
    if(this.isArchiver==false)
     {arch="0"}
    else
      {arch="1"}
    this.commande.getCmd(arch).subscribe(response => {
      this.listeCmd = response;
      this.listeCmd.reverse();
      this.loading = false;
      this.sauvgardListe = this.listeCmd;
      for (let i = 0; i < this.listeCmd.length; i++) {
        this.moreDetailtest.push(true);
        this.detailValue.push(true);
      }
      if (localStorage.saveList) {
        this.resetValue()
        this.filtre()
        localStorage.removeItem('saveList');
      }
      this.initialiserNewList();
    }, (error) => {
      this.loading = false;
      this._snackBar.open(
        (error.status==0)?"connexion au serveur impossible !!":error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  /***********************cancel commande***************************/
  openDialog(ref: any): void {
    const dialogRef = this.dialog.open(DialogAnnuler, {
      width: '500px',
      height: '190px',
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
    }, (error) => {
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  /****************filtre methode*****************/


  cherchVin(vin: String, list: any) {
    this.loadingRecherchBtn = true;
    let auxList: any = []
    this.commande.getVinCmd(vin).subscribe((response: any) => {
      this.loadingRecherchBtn = false;
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (response[i] == list[j].numCde) {
            auxList.push(list[j]);
          }
        }
      }
    })
    return auxList;
  }
  cherchRefArt(refArt: String, list: any) {

    this.loadingRecherchBtn = true;
    let auxList: any = []
    this.commande.getRefArtCmd(refArt).subscribe((response: any) => {
      this.loadingRecherchBtn = false;
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (response[i] == list[j].numCde) {
            auxList.push(list[j]);
          }
        }
      }
    })
    return auxList;
  }
  verifDate(date: any) {
    date = "" + this.datepipe.transform(date, 'yyyy-MM-dd');
    let dateStart: any = "" + this.datepipe.transform(this.range.value.start, 'yyyy-MM-dd');
    let dateEnd: any = "" + this.datepipe.transform(this.range.value.end, 'yyyy-MM-dd');

    if (date.length && dateStart.length && dateEnd.length) {
      let ddS = parseInt(dateStart.substr(8, 2));
      let mmS = parseInt(dateStart.substr(5, 2));
      let yyS = parseInt(dateStart.substr(0, 4));

      let ddE = parseInt(dateEnd.substr(8, 2));
      let mmE = parseInt(dateEnd.substr(5, 2));
      let yyE = parseInt(dateEnd.substr(0, 4));

      let dd = parseInt(date.substr(8, 2));
      let mm = parseInt(date.substr(5, 2));
      let yy = parseInt(date.substr(0, 4));

      if ((ddS <= dd && mmS <= mm && yyS <= yy) && (ddE >= dd && mmE >= mm && yyE >= yy)) {
        return true;
      }
    }
    return false;
  }
  /******************************************* datetest=new Date(2021, 3, 17) ************************************************/
  filtre() {
    let listeCmdAux: any = [];
    this.listeCmd = this.sauvgardListe;
    if (this.typeCmd.length || this.statutCmd.length || this.statutCmd.length || this.numCmd || this.isAnnuler != false || (this.range.value.start && this.range.value.end) || this.refArt.length || this.VIN.length) {
      if (this.typeCmd == '2') {
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
      if (this.statutCmd.length != 0) {
        if (listeCmdAux.length == 0) {
          if (this.statutCmd == "1") {
            for (let i = 0; i < this.listeCmd.length; i++) {
              if (this.listeCmd[i].enregistree == 1) {
                listeCmdAux.push(this.listeCmd[i]);
              };
            };
          }
          if ( this.statutCmd == '0') {
            listeCmdAux = this.sauvgardListe;
          }
          if (this.statutCmd == "2") {
            for (let i = 0; i < this.listeCmd.length; i++) {
              if (this.listeCmd[i].livree == 1) {
                listeCmdAux.push(this.listeCmd[i]);
              };
            };
          }
          if (this.statutCmd == "3") {
            for (let i = 0; i < this.listeCmd.length; i++) {
              if (this.listeCmd[i].facturee == 1) {
                listeCmdAux.push(this.listeCmd[i]);
              };
            };
          }
        }
        if (listeCmdAux.length != 0 && this.statutCmd != "0") {
          let aux: any = listeCmdAux;
          listeCmdAux = []
          if (this.statutCmd == "1") {
            for (let i = 0; i < aux.length; i++) {
              if (aux[i].enregistree == 1) {
                listeCmdAux.push(aux[i]);
              };
            };
          } if (this.statutCmd == "2") {
            for (let i = 0; i < aux.length; i++) {
              if (aux[i].livree == 1) {
                listeCmdAux.push(aux[i]);
              };
            };
          }
          if (this.statutCmd == "3") {
            for (let i = 0; i < aux.length; i++) {
              if (aux[i].facturee == 1) {
                listeCmdAux.push(aux[i]);
              };
            };
          }
        }
      }

      if (this.numCmd.length != 0) {
        if (listeCmdAux.length == 0) {
          for (let i = 0; i < this.listeCmd.length; i++) {
            let numCmd: string = "" + this.listeCmd[i].numCde;
            if (this.numCmd.length == 10) {
              if (numCmd === this.numCmd) {
                listeCmdAux.push(this.listeCmd[i]);
              };
            }
            else {
              if (numCmd.includes(this.numCmd)) {
                listeCmdAux.push(this.listeCmd[i]);
              };
            }
          };
        }
        else {
          let aux: any = listeCmdAux;
          listeCmdAux = [];
          for (let i = 0; i < aux.length; i++) {
            let numCmd: string = "" + aux[i].numCde;
            if (numCmd.includes(this.numCmd)) {
              listeCmdAux.push(aux[i]);
            };
          };
        };
      }

      if (this.isAnnuler == true) {
        if (listeCmdAux.length == 0) {
          this.listeCmd = this.sauvgardListe;
          for (let i = 0; i < this.listeCmd.length; i++) {
            let ann = this.listeCmd[i].annulee;
            if (ann == 1) {
              listeCmdAux.push(this.listeCmd[i]);
            };
          };
        }
        else {
          let aux = listeCmdAux
          listeCmdAux = []
          for (let i = 0; i < aux.length; i++) {
            let ann = aux[i].annulee;
            if (ann == 1) {
              listeCmdAux.push(aux[i]);
            };
          };
        }
      }
      if (this.range.value.start && this.range.value.end) {
        if (listeCmdAux.length == 0) {
          this.listeCmd = this.sauvgardListe
          for (let i = 0; i < this.listeCmd.length; i++) {
            let dc: any = new Date();
            dc = this.listeCmd[i].date_Cmd;
            if (this.verifDate(dc) == true) {
              listeCmdAux.push(this.listeCmd[i]);
            }
          }
        }
        else {
          let aux = listeCmdAux
          listeCmdAux = [];
          for (let i = 0; i < aux.length; i++) {
            let dc: any = new Date();
            dc = aux[i].date_Cmd;
            if (this.verifDate(dc) == true) {
              listeCmdAux.push(aux[i]);
            }
          }
        }
      }
      if (this.refArt.length) {
        if (listeCmdAux.length == 0) {
          listeCmdAux = this.cherchRefArt(this.refArt, this.listeCmd);
        }
        else {
          listeCmdAux = this.cherchRefArt(this.refArt, listeCmdAux);
        }
      }
      if (this.VIN.length && this.VIN.length == 17) {
        if (listeCmdAux.length == 0) {
          listeCmdAux = this.cherchVin(this.VIN, this.listeCmd);
        }
        else {
          listeCmdAux = this.cherchVin(this.VIN, listeCmdAux);
        }
      }
    }
    else {
      listeCmdAux = this.sauvgardListe;
    }
    this.listeCmd = listeCmdAux;
    this.initialiserNewList();
  }
  initialiserNewList()
  {
    this.newList= new Array();
    let i : number ; 
    for(i = 0 ; i<10&&i<this.listeCmd.length; i++)
    {
      let val = this.listeCmd[i] ; 

      this.newList.push(Object.assign({}, val));
    }
    this.numPage = 1 ; 
  }
  pageSuiv()
  {
    let i : number ; 
    this.newList= new Array();
    for(i = (this.numPage*10) ; i< this.listeCmd.length && i<=(this.numPage*10)+10 ; i++)
    {
      let val = this.listeCmd[i] ; 
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
      let val = this.listeCmd[i] ; 
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
