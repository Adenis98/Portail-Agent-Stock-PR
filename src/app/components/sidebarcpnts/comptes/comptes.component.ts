import { GetcomptesService } from '../../../services/comptes/comptes.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css'],
  animations: [
    trigger('ajouterModifierAnim', [
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
    trigger('ajouterSupprimerCompteAnim', [
      transition('* => void', animate('0.7s 0.2s ease-in',
        style([{ transform: 'translateX(200%)' }, { backgroundColor: 'red' }])
      )
      ),
      transition('void => *',
        [style([{ transform: 'translateX(-200%)' }, { backgroundColor: 'green' }])
          , animate('0.5s 0.2s ease-out'
          )]
      )
    ])
  ]
})
export class ComptesComponent implements OnInit {
  listcompte: any;
  loading = true;
  loadingBtn = false;
  hidePsd = true;

  afficherAMUsr = false;
  afficherAUsrImg = false;
  afficherMUsrImg = false;

  log(x:any){
    console.log("ngModel:"+x);
    console.dir("ngModel:"+x);
  }
  //******** form input values **********
  id: String = ""
  userName: String = "";
  psd1: String = "";
  psd2: String = "";
  permis: String = "";
  rdBtn1=false ; 
  rdBtn2=false ; 
  dNumber: String = "";

  usrUpdate: any;
  //*************************************
  ;

  constructor(private Compte: GetcomptesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  spliceAllButOne() {

  }
  getUser() {
    this.Compte.getCompte().subscribe(data => {
      this.loading = false;
      this.listcompte = data;
    }, erreur => {
      this.loading = false;
      console.log("erreur : " + erreur.message);
    });
  }

  public us: any;
  /* *************************** edit the user **************************** */
  editUser(user: any) {
    this.usrUpdate = user;
    this.afficherAUsrImg = false;
    setTimeout(() => {
      this.afficherMUsrImg = true;
      this.afficherAUsrImg = false; //bech nsala7 bug
    }, 450);

    this.id = user.code;
    this.userName = user.userName;
    this.dNumber = user.dealer_Number;
    this.permis = user.permis.toString();
    this.psd1 = user.password;

    this.us = user;
  }
  //**************************** add user ****************************
  openAddUserDialoge() {
    this.afficherMUsrImg = false;
    setTimeout(() => {
      this.afficherAUsrImg = true;
      this.afficherMUsrImg = false; //bech nsala7 bug
    }, 450);
    this.userName = "";
    this.dNumber = "";
    this.permis = "";
    this.psd1 = "";
    this.psd2 = "";
  }
  
  closeAU()
  {
    this.afficherAUsrImg = false;
    this.afficherMUsrImg = false;
    this.afficherAMUsr = false;
  }
  addUser() {

    let body: any =
    {
      "userName": this.userName,
      "dealer_Number": parseInt(this.dNumber.replace(/\D/g, "")),
      "permis": parseInt(this.permis.replace(/\D/g, "")),//hathi tna7i 7rouf w les espaces mel numero (replace.......)
      "password": this.psd1
    };

    this.Compte.addCompte(body).subscribe(Response => {
      this._snackBar.open(
        "L'utilisateur «" + this.userName + "» a été ajouter avec succès ✓", "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 5000,
      });
      this.afficherAMUsr = false;
      console.log("response : " + Response);
      this.listcompte.push(Response);
    }, (error) => {
        this.loading = false;
        this._snackBar.open(
          "echec d'ajout de l'utilisateur , message d'erreur :"+error.error.message, "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
      })
    
  }

  //**************************** delete the user ****************************
  deleteUser(compt: any) {
    this.Compte.deletCompte(compt).subscribe(Response => {
      let index = this.listcompte.indexOf(compt);
      this.listcompte.splice(index, 1);
      this._snackBar.open(
        "L'utilisateur «" + compt.userName + "» a été supprimé avec succès ✓", "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 5000,
      });
    }, (error) => {
      console.log("error : " + error);
      this._snackBar.open(
        "echec de suppression de l'utilisateur , message d'erreur "+error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })

  }



  //**************************** Delete Dialog ****************************
  openDialog(compt: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      height: '200px',
      data: compt
    });

    dialogRef.afterClosed().subscribe((result: String) => {
      if (result == "true") {
        this.deleteUser(compt);
      } else if (result == "false") {

      }
    });
  }


  //**************************** Update user ****************************

  updateUser() {
    this.loadingBtn =true;
    let body: any =
    {
      "userName": this.userName,
      "dealer_Number": parseInt(this.dNumber.replace(/\D/g, "")),
      "permis": parseInt(this.permis.replace(/\D/g, "")),//hathi tna7i 7rouf w les espaces mel numero (replace.......)
      "password": this.psd1
    }
    if (this.psd1 == this.psd2) {
      this.Compte.updateCompte(this.id, body).subscribe(Response => {
        this.loadingBtn = false;
        let index = this.listcompte.indexOf(this.usrUpdate);
        this.listcompte.splice(index, 1);

        setTimeout(() => {
          this.listcompte.push(Response);
        }, 920);
        
        this._snackBar.open(
          "L'utilisateur «" + this.userName + "» a été modifier avec succès ✓", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        });
      }
        , (error) => {
          this.loadingBtn = false;
          console.log("error message : " + error.error.message );
          this._snackBar.open(
            "echec de modification de l'utilisateur , message d'erreur :" + error.error.message , "", {
            verticalPosition: 'top',
            panelClass: 'red-snackbar',
            duration: 5000,
          });
        })
    }else{
      this.loadingBtn = false;
    }
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close("false");
  }
  delete(): void {
    this.dialogRef.close("true");
  }

}
