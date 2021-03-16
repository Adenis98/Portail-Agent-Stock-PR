import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetcomptesService } from '../../../services/comptes/comptes.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  listcompte: any = [
    {
      "code": 1,
      "userName": "youssef",
      "dealer_Number": "55243382"
    },
    {
      "code": 1,
      "userName": "youssef",
      "dealer_Number": "55243382"
    },
    {
      "code": 1,
      "userName": "youssef",
      "dealer_Number": "55243382"
    },
    {
      "code": 1,
      "userName": "youssef",
      "dealer_Number": "55243382"
    }
  ];
  constructor(private Comptes: GetcomptesService) {
    this.Comptes.getComptes().toPromise().then(data => {
      console.log(HttpHeaders);
    })
  }

  ngOnInit(): void {

  }
  editUser(user: {}) {
    console.log(user)
  }
}
