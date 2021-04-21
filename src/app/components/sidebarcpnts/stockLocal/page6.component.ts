import { StockLocalService } from './../../../services/stockLocal/stock-local.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginatorConfiguration';
export interface StockLocak {
  "ug": number,
  "stock": number,
  "qteAch": number,
  "codArt": string,
  "libelle": string,
  "puAgents": number
}


@Component({
  selector: 'app-page6',
  templateUrl: './page6.component.html',
  styleUrls: ['./page6.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class Page6Component implements OnInit {
  data: any = []
  displayedColumns: string[] = ['refArt', 'libelle', 'pu', 'qte'];
  dataSource: MatTableDataSource<StockLocak>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private stockLocal: StockLocalService) {
    this.dataSource = new MatTableDataSource(this.data)
  }
  ngOnInit(): void {
    this.stockLocal.getStockLocal().subscribe((respons: any) => {
      this.data = respons;
      this.dataSource = new MatTableDataSource(this.data);
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  formatMoney(x: any) {
    const euro = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 3
    })
    return (euro.format(x));
  };
}


