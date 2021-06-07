import { StatsService } from './../../../services/stats/stats.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, SingleDataSet } from 'ng2-charts';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [

    trigger(
      'enterLeftTop', [
      transition(':enter', [
        style({ transform: 'translateX(-10%) translateY(-10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0) translateY(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger(
      'enterRightTop', [
      transition(':enter', [
        style({ transform: 'translateX(10%) translateY(-10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0) translateY(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger(
      'enterLeftBot', [
      transition(':enter', [
        style({ transform: 'translateX(-10%) translateY(10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0) translateY(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ]),
    ]
    ),
    trigger(
      'enterRightBot', [
      transition(':enter', [
        style({ transform: 'translateX(10%) translateY(10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0) translateY(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
  ]
})
export class DashboardComponent implements OnInit {
  nbrCmdStockFerme: any = [];
  public barChartOptions: ChartOptions = {
    title: {
      text: 'Les 5 Meilleurs Pièces Commander',
      display: true,
      fontSize: 15,
    },
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
    scales: {

      xAxes: [{}], yAxes: [{
        display: true, ticks: {
          beginAtZero: true,
        }
      }]
    },

    plugins: {
      pluginDataLabels: {
        display: false,
      },
    }
  };
  public barChartLabels: Label[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#d6a217',
    },
    { // second color
      backgroundColor: '#364547',
    },
    { // third color
      backgroundColor: '#BE3144',
    },
    { // 4 color
      backgroundColor: '#547184',
    },
    { // 5 color
      backgroundColor: '#00A492',
    },];
  public barChartData: ChartDataSets[] = [];
  /***************************cercle******************** */

  public pieChartOptions: ChartOptions = {
    title: {
      text: 'Les Commandes',
      display: true,
      fontSize: 15,
    },
    responsive: true,
    legend: {

      position: 'bottom',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
    maintainAspectRatio: true,
    aspectRatio: 5,
    tooltips: {
      enabled: true
    },
  };
  cmdFerme: number = 0;
  cmdNormale: number = 0;
  public pieChartLabels: Label[] = ['Command Stock ', 'Commande Ferme '];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#364547', '#BE3144'],
    },
  ];

  /*******************polarChart************** */
  public polarAreaChartOption: ChartOptions = {
    scales: {
      xAxes: [{
        type: 'radial',
        position: 'bottom',
        display: false
      }]
    },
    title: {
      text: 'Les Status des Commandes',
      display: true,
      fontSize: 15,
    },
    responsive: true,
    legend: {

      position: 'bottom',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
    maintainAspectRatio: false,
    aspectRatio: 0,
    tooltips: {
      enabled: true
    },
  };
  public polarAreaChartLabels: Label[] = ['CommandeEnregistrée ', 'Commande Livrée', 'Commande Facturée'];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartColors = [
    {
      backgroundColor: ['#364547', '#d6a217', '#00A492'],
    },
  ];
  /***********last bar chart*************** */
  public barChartOptions2: ChartOptions = {
    title: {
      text: 'Les Commandes Par Mois',
      display: true,
      fontSize: 15,
    },
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
    scales: {

      xAxes: [{}], yAxes: [{
        display: true, ticks: {
          beginAtZero: true,
        }
      }]
    },

    plugins: {
      pluginDataLabels: {
        display: false,
      },
    }
  };
  public barChartLabels2: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;

  public barChartData2: ChartDataSets[] = [
  ];


  constructor(private stats: StatsService,
    private _snackBar: MatSnackBar,) { }
  getStatAllCmd() {
    this.stats.getAllCmdStockFermeMonth().subscribe((response: any) => {
      this.barChartData2 = [
        { data: response.dataCmdFerme, label: 'Commande Ferme' },
        { data: response.dataCmdStock, label: 'Comande Stock' }
      ]
    }, (error) => {
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  getnbrStockFerme() {
    this.stats.getNbrCmdStockFerme().subscribe((respons: any) => {
      this.cmdFerme = respons.cmdFerme;
      this.cmdNormale = respons.cmdNormale
      this.pieChartData = [this.cmdNormale, this.cmdFerme]
    }
      , (error) => {
        this._snackBar.open(
          (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
          verticalPosition: 'top',
          panelClass: 'red-snackbar',
          duration: 5000,
        });
      })
  }

  getCmdByStatus() {
    this.stats.getCmdByStatus().subscribe((response: any) => {
      this.polarAreaChartData = [response.enrg, response.liv, response.fact];
    }, (error) => {
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  getTop5() {
    this.stats.getTop5().subscribe((response: any) => {
      this.barChartData = response;
    }, (error) => {
      this._snackBar.open(
        (error.status == 0) ? "connexion au serveur impossible !!" : error.error.message, "", {
        verticalPosition: 'top',
        panelClass: 'red-snackbar',
        duration: 5000,
      });
    })
  }
  ngOnInit(): void {
    this.getnbrStockFerme();
    this.getCmdByStatus();
    this.getTop5();
    this.getStatAllCmd();
  }

}
