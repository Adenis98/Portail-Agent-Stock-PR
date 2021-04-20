import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginatorConfiguration';
export interface UserData {
  refArt: string;
  libelle: string;
  pu: string;
  qte: string;
}

@Component({
  selector: 'app-page6',
  templateUrl: './page6.component.html',
  styleUrls: ['./page6.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class Page6Component implements OnInit {

  displayedColumns: string[] = ['refArt', 'libelle', 'pu', 'qte'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
    
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
}

/** Builds and returns a new User. */
function formatMoney(x: any) {
  const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3
  })
  return (euro.format(x));
};
function createNewUser(id: number): UserData {
  
  return {
    refArt: id.toString(),
    libelle: 'name',
    pu: formatMoney(525),
    qte: "1"
  };

}
