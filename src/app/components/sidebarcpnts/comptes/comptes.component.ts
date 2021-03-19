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
        style({ transform: 'translateX(200%)' })
      )
      ),
      transition('void => *',
        [style({ transform: 'translateX(-200%)' })
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


  //form input values
  userName: String = "";
  psd1: String = "";
  psd2: String = "";
  permis: String = "";
  dNumber: String = "";

  ;

  constructor(private Compte: GetcomptesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  spliceAllButOne() {

  }
  getUser()
  {
    this.Compte.getComptes().subscribe(data => {
      this.loading = false;
      this.listcompte = data;
    }, erreur => {
      this.loading = false;
      console.log("erreur : " + erreur.message);
    });
  }

  public us: any;
  //edit the user
  editUser(user: any) {
    //this.afficherAMUsr = true;
    this.us = user;
    console.log(user);
  }
  //add user
  openAddUserDialoge()
  {
    this.afficherAMUsr = true
  }
  addUser() {
    
    let body: any =
    {
      "userName": this.userName,
      "dealer_Number": parseInt(this.dNumber.replace(/\D/g, ""), 10),
      "permis": parseInt(this.permis.replace(/\D/g, ""), 10),//hathi tna7i 7rouf w les espaces mel numero (replace.......)
      "password": this.psd1
    }
    if (this.psd1 == this.psd2) {
      this.Compte.addCompt(body).subscribe(Response => {
        
          this._snackBar.open(
            "L'utilisateur «" + this.userName + "» a été ajouter avec succès ✓", "", {
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 5000,
          });
          this.afficherAMUsr = false;
          this.getUser();
      }
      ,(error) =>
      {
        this.loading = false;
        console.log(error);
        this._snackBar.open(
          "echec d'ajout cet utilisateur«" + this.userName + "»", "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar'
        });
      })
    }
  }

  //delete the user
  deleteUser(compt: any) {
    this.Compte.deletCompt(compt).subscribe(Response => {
      let index = this.listcompte.indexOf(compt);
      this.listcompte.splice(index, 1);
      this._snackBar.open(
        "L'utilisateur «" + compt.userName + "» a été supprimé avec succès ✓", "", {
        verticalPosition: 'top',
        panelClass: 'green-snackbar',
        duration: 5000,
      });
    })

  }



  //Delete Dialog
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
