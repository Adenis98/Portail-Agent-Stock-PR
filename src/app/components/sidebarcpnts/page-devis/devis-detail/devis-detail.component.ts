import { DevisService } from 'src/app/services/devis/devis.service';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-devis-detail',
  templateUrl: './devis-detail.component.html',
  styleUrls: ['./devis-detail.component.css']
})
export class DevisDetailComponent implements OnInit{
  numDevis: any;
  devisInfo: any=[];
  nomClient: any;
  listePrDevis: any=[];
  constructor(private routerinfo: ActivatedRoute,
    private router: Router,
    private devis:DevisService) { }

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
