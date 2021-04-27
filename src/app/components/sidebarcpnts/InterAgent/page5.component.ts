import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InterAgentsStockService } from 'src/app/services/interAgentsStock/inter-agents-stock.service';
import {ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-page5',
  templateUrl: './page5.component.html',
  styleUrls: ['./page5.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class Page5Component implements OnInit {

  refPr:any; 
  dealerName:any; 

  //*** table variables ***
  articleIntrouvable = false ;
  tailleList : number = 0  ;
  public dataSource :any;//list of agents
  dataSource2 : any ; 
  dataSource3 : any = new Array();
  columnsToDisplay = ['dealerName', 'dealerPhoneNumber'];
  expandedElement: PeriodicElement | null=null;
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  // *********************
  constructor(private interAgent : InterAgentsStockService) { }

  ngOnInit(): void {
    this.getInterAgentsStock();
  }

  private viderDealerStockList()
  {
    let i : number ; 
    for(i=0;i< this.dataSource.length ; i++)
      this.dataSource[i]['dealerStockList']=[];
  }
  public getInterAgentsStock()
  {
    this.articleIntrouvable = false ;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    this.interAgent.addLineCmd(dNbr).subscribe((data)=>{
      this.dataSource = data; 
      this.dataSource3= new Array();
      this.dataSource.forEach((val: any,index:any) =>{
        this.dataSource3.push(Object.assign({}, val));
      });
      this.viderDealerStockList() ; 
      this.tailleList = (this.dataSource)?this.dataSource.length:'' ; 
    });
  }

  chercherAgents():boolean
  {
    if(this.refPr=='')
    {
      this.getInterAgentsStock();
      return true ; 
    }
      
    this.dataSource= new Array() ; 
    this.dataSource3.forEach((val: any,index:any) =>{
      this.dataSource.push(Object.assign({}, val));
    });
    console.log(this.dataSource3);
    let i ,j ,v :number ; 
    let newList :any= new Array();
    this.dataSource.forEach((val: any,index:any) =>{
      newList.push(Object.assign({}, val));
    });
    let articleInt = true ;
    for(i=0;i< this.dataSource.length ; i++)
    {
      v=0 ; 
      for(j=0;j<this.dataSource[i]['dealerStockList'].length;j++)
      {
        if(this.dataSource[i]['dealerStockList'][j]['codArt']==this.refPr)
        {
          v=1 ;
          articleInt = false;
        }
        else{
          this.dataSource[i]['dealerStockList'].splice(j, 1);
          j--;
        }
      }
      if(v==0)
      {
        this.dataSource.splice(i, 1);
        i--;
      }
    }
    this.articleIntrouvable = articleInt ; //afficher 'article introuvable '
    (this.table)?this.table.renderRows():'';
    this.tailleList = this.dataSource.length ; 
    
    return true ; 
  }
  
}

export interface PeriodicElement {
  dealerName: string;
  dealerPhoneNumber: String;
}
