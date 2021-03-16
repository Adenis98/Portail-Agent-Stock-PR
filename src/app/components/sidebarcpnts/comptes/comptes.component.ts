import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetcomptesService } from '../../../services/comptes/comptes.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  listcompte:any;
  loading=true;
  constructor(private Compte: GetcomptesService) {}

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
  editUser(user: {}) {
    console.log(user)
  }
}
