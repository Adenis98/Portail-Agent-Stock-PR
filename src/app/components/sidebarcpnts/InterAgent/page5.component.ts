import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InterAgentsStockService } from 'src/app/services/interAgentsStock/inter-agents-stock.service';

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
  tailleList : boolean =true ;
  public dataSource :any;//list of agents
  columnsToDisplay = ['dealerName', 'dealerPhoneNumber'];
  expandedElement: PeriodicElement | null=null;
  // *********************
  constructor(private interAgent : InterAgentsStockService) { }

  ngOnInit(): void {
    this.getInterAgentsStock();
  }

  private getInterAgentsStock()
  {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.jwt);
    let dNbr = decodedToken["dealerNbr"];
    this.interAgent.addLineCmd(12).subscribe((data)=>{
      this.dataSource = data ; 
    });
  }

  chercherAgents()
  {
    
    let i ,j ,v :number ; 
    for(i=0;i< this.dataSource.length ; i++)
    {
      v=0 ; 
      for(j=0;j<this.dataSource[i]['dealerStockList'].length;j++)
      {
        if(this.dataSource[i]['dealerStockList'][j]['codArt']==this.refPr)
        {
          console.log(this.dataSource[i]['dealerStockList'][j]['codArt']+"****** "+this.refPr);
          v=1 ;
        }
      }
      if(v==0)
      {
        this.dataSource.splice(i, 1);
        i--;
      }
    }
    console.log(this.dataSource);
  }
}

export interface PeriodicElement {
  dealerName: string;
  dealerPhoneNumber: String;
}
