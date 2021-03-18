import { GetcomptesService } from '../../../services/comptes/comptes.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css'],
  animations:[
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
  listcompte:any;
  loading=true;
  loadingBtn=false;
  hidePsd=true; 
  afficherAMUsr =false ; 

  //form input values
  userName:String=""; 
  mdp:String=""; 
  permis:Number=0;
  dNumber:Number=0;

  constructor(private Compte: GetcomptesService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.Compte.getComptes().subscribe(data=>{
      this.loading=false;
      console.log(data);
      this.listcompte=data;
    },erreur=>{
      this.loading=false;
      console.log("erreur : "+erreur.message);
    });
  }

  spliceAllButOne(){

  }

  editUser(user: {}) {
    this.afficherAMUsr = true ;
    console.log(user)
  }
  deleteUser(compt:any)
  {
    this.Compte.deletCompt(compt).subscribe(Response=>{
      let index =this.listcompte.indexOf(compt);
      this.listcompte.splice(index,1);
      this._snackBar.open(
        "L'utilisateur '"+compt.userName+"' a été supprimé", "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }

  animal: string="";
  name: string="";
  
  openDialog(compt:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      height:'200px',
      data: compt
    });

    dialogRef.afterClosed().subscribe((result: String) => {
      if(result=="true")
      {
        this.deleteUser(compt);
      }else if(result=="false"){

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
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  onNoClick(): void {
    this.dialogRef.close("false");
  }
  delete(): void {
    this.dialogRef.close("true");
  }
 
}
