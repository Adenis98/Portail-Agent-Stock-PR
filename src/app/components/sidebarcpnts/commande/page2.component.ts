import { CommandeService } from './../../../services/commande/commande.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  animations: [
    trigger('ligneCommandAnim', [
      transition('* => void', animate('0.7s 0.2s ease-in',
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
          style({transform: 'translateX(-20%)', opacity: 0}),
          animate('400ms', style({transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden'}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    ),
    trigger('morDetailAnim', [
      transition(
        '* => void',
        animate(
          '0.4s 0.0s ease-in',
          style([{ transform: 'translateY(-110%)' }, { opacity: 0 }])
        )
      ),
      transition('void => *',
        [
          style([{ transform: 'translateY(-110%)', opacity: 0 }]),
          animate('0.4s 0.0s ease-out')
        ]
      )
    ])
  ]
})
export class Page2Component implements OnInit {
  moreDetailtest: any = [true]
  detailValue: any = [true]
  loading=true;

  /***commande variable***********/
  listeCmd: any = []


  constructor(private router: Router,
     private commande: CommandeService,
     public datepipe: DatePipe,
     public dialog: MatDialog,) {

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
  formatDate(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd')
  }
  openDetail(index: any) {
    if (!this.detailValue[index])
      setTimeout(() => {
        this.moreDetailtest[index] = !this.moreDetailtest[index]
        this.detailValue[index] = true;
      }, 25);
    else {
      this.detailValue[index] = false;
      this.moreDetailtest[index] = !this.moreDetailtest[index]
    }
  }
  openListePr(ref:any) {
    this.router.navigate(['/page2',ref])
  }
  /***************************get liste commande *********************************/
  getListeCmd() {
    if(this.listeCmd.length==0)
      this.loading=false;
    this.commande.getCmd().subscribe(response => {
      this.listeCmd = response;
      this.loading=false;
      for (let i = 0; i < this.listeCmd.length; i++) {
        this.moreDetailtest.push(true);
        this.detailValue.push(true);
      }
    })
  }
  /***********************cancel commande***************************/
  openDialog(ref: any): void {
    const dialogRef = this.dialog.open(DialogDelete, {
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

  cancelCmd(ref:any){
   this.commande.cancelCmd(ref).subscribe(response=>{
    console.log(response)
   })

  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.css']
})
export class DialogDelete {
  
  constructor(
    public dialogRef: MatDialogRef<DialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close("false");
  }
  cancel(): void {
    this.dialogRef.close("true");
  }

}
