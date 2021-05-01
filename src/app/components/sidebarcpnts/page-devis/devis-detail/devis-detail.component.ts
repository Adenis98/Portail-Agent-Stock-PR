import { DevisService } from 'src/app/services/devis/devis.service';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, style, transition, trigger } from '@angular/animations';

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
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    let numDevis = this.routerinfo.snapshot.paramMap.get('numDevis');
    this.numDevis = numDevis;
    this. getDevisDetail()
    
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

}
