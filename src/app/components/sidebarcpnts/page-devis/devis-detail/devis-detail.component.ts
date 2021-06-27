import { DevisService } from 'src/app/services/devis/devis.service';
import {  Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockPrService } from 'src/app/services/stockPr/stock-pr.service';

@Component({
  selector: 'app-devis-detail',
  templateUrl: './devis-detail.component.html',
  styleUrls: ['./devis-detail.component.css'],
  animations: [
    trigger(
      'enterAnimationLivrBox', [
      transition(':enter', [
        style({ transform: 'translateY(-40%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateY(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger(
      'enterAnimationTable', [
      transition(':enter', [
        style({ transform: 'translateX(-40%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger(
      'enterAnimationTableTotal', [
      transition(':enter', [
        style({ transform: 'translateX(40%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
  ]
})
export class DevisDetailComponent implements OnInit{
  numDevis: any;
  devisInfo: any=[];
  nomClient: any;
  listePrDevis: any=[];
  constructor(private routerinfo: ActivatedRoute,
    private router: Router,
    private devis:DevisService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    let numDevis = this.routerinfo.snapshot.paramMap.get('numDevis');
    this.numDevis = numDevis;
    this. getDevisDetail()
    
  }
  formatMoney2(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  getDevisDetail()
  {
    this.devis.getOneDevis(this.numDevis).subscribe((respons:any)=>{
      this.devisInfo=respons.devis;
      this.listePrDevis=respons.listeLigneDevis
      }, (error) => {
        this._snackBar.open(
          (error.status==0)?"connexion au serveur impossible !!":error.error.message, "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
      });
  };
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  precedent() {
    this.router.navigate(['/page3']);
  };
  openDialog(): void {
    const dialogRef = this.dialog.open(ajouterLigneDevisDialog, {
      width: '1000px',
      height: '500px', 
      data: {numDevis: this.numDevis}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this. getDevisDetail();
    });
  }

}


@Component({
  selector: 'ajouterLigneDevisDialog',
  templateUrl: 'ajouterLigneDevisDialog.html',
  styleUrls : ['ajouterLigneDevisDialogStyle.css'],
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
    ]),]
})
export class ajouterLigneDevisDialog {

  constructor(private stock: StockPrService,private devis : DevisService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ajouterLigneDevisDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    
  loading:boolean =false; 
  refPr: any ='';
  listOfPr: any = [];
  tauxRemise = "0";
  qte = "0";
  codArt ="";

  getStock() {
    this.qte = "1";
    this.tauxRemise = "0";
    this.loading = true;
    let body =
    {
      "codeArt": this.refPr,
      "libelle": ""
    }
    this.stock.getStockPr(body).subscribe(response => {
      this.loading = false;
      this.listOfPr = [];
      setTimeout(() => {
        this.listOfPr = response;
      }, 200);
    }, (error:any) => {
      this.loading = false;
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    });
  }

  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  
  addTaux() {
    if (parseInt(this.tauxRemise) < 100)
      this.tauxRemise = "" + (parseInt(this.tauxRemise) + 1);
  }
  removeTaux() {
    if (parseInt(this.tauxRemise) > 0)
      this.tauxRemise = "" + (parseInt(this.tauxRemise) - 1);
  }
  addQte() {
    this.qte = (parseInt(this.qte) + 1).toString();
  }
  removeQte() {
    if (parseInt(this.qte) > 1)
      this.qte = (parseInt(this.qte) - 1).toString();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ajouterArticle(){
    this.devis.ajouterAutreLigneDevis(this.data.numDevis, parseFloat(this.tauxRemise) , this.codArt , parseInt(this.qte)).subscribe(
      (response:any)=>{
        this._snackBar.open(
          "Le Devis «" + this.data.numDevis + "» a été mis a jour ✓", "", {
          verticalPosition: 'top',
          panelClass: 'green-snackbar',
          duration: 5000,
        });
        this.onNoClick();
      },
      (error:any)=>{
        this._snackBar.open(
          error.error.message.substr(error.error.message.indexOf(":")+1), "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
      }
    );
  }
  

}


