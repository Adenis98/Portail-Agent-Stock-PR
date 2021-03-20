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

  //******** form input values **********
  id: String = ""
  userName: String = "";
  psd1: String = "";
  psd2: String = "";
  permis: String = "";
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
    this.permis = user.permis;
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
  verifPassword() {
   
    if (this.psd2 != this.psd1) {
      this._snackBar.open(
        "verifier le mot de passe s'il vous plait", "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 2000,
      });
      return false
    }
    return true;
  }
  closeAU()
  {
  //this.afficherAUsrImg = false;
  //this.afficherMUsrImg = false;
  }
  addUser() {
    console.log(this.userName);
    let body: any =
    {
      "userName": this.userName,
      "dealer_Number": parseInt(this.dNumber.replace(/\D/g, ""), 10),
      "permis": parseInt(this.permis.replace(/\D/g, ""), 10),//hathi tna7i 7rouf w les espaces mel numero (replace.......)
      "password": this.psd1
    };
    ;
    if (this.verifPassword()) {
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
      }
        , (error) => {
          this.loading = false;
          console.log("error : " + error);
          this._snackBar.open(
            "echec d'ajout de l'utilisateur «" + this.userName + "»", "", {
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          });
        })
    }
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
        "echec de suppression de l'utilisateur «" + compt.userName + "»", "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar'
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
    console.log(this.userName);
    let body: any =
    {
      "userName": this.userName,
      "dealer_Number": parseInt(this.dNumber.replace(/\D/g, ""), 10),
      "permis": parseInt(this.permis.replace(/\D/g, ""), 10),//hathi tna7i 7rouf w les espaces mel numero (replace.......)
      "password": this.psd1
    }
    if (this.psd1 == this.psd2) {
      this.Compte.updateCompte(this.id, body).subscribe(Response => {
        this.listcompte.push(Response);


        let index = this.listcompte.indexOf(this.usrUpdate);
        this.listcompte.splice(index, 1);

        this._snackBar.open(
          "L'utilisateur «" + this.userName + "» a été modifier avec succès ✓", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        });
        this.afficherAMUsr = false;
      }
        , (error) => {
          this.loading = false;
          console.log("error : " + error.message + " id " + this.id);
          this._snackBar.open(
            "echec de modification de l'utilisateur «" + this.userName + "»" + error, "", {
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          });
        })
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
