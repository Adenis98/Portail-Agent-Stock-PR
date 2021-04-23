import { StockLocalService } from './../../../services/stockLocal/stock-local.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginatorConfiguration';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading: boolean=true;


  constructor(private stockLocal: StockLocalService,
    private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.data)
  }
  ngOnInit(): void {
    this.stockLocal.getStockLocal().subscribe((respons: any) => {
      this.loading = false;
      this.data = respons;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error) => {
      this.loading = false;
      this._snackBar.open(
        "" + error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })

  }

  ngAfterViewInit() {
   
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


