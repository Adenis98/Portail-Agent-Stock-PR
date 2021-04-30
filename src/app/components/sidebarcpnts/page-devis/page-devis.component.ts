import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis/devis.service';

@Component({
  selector: 'app-page-devis',
  templateUrl: './page-devis.component.html',
  styleUrls: ['./page-devis.component.css']
})
export class PageDevisComponent implements OnInit {
  listeDevis:any=[];
  loadingList=false
  constructor(private router: Router,
    private devis: DevisService,
    public datepipe: DatePipe,) {

     }

  ngOnInit(): void {
    this.getDevis()
  }
  getDevis()
  {
    this.loadingList=true;
    this.devis.getDevis().subscribe((respons:any)=>{
      this.loadingList=false;
      this.listeDevis=respons.reverse();
    })
  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  }
  openDevis(ref: any) {
    this.router.navigate(['/page3', ref])
  }
}
