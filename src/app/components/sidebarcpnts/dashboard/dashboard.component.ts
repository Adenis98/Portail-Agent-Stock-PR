import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, SingleDataSet } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    
    trigger(
      'enterLeftTop', [
      transition(':enter', [
        style({ transform: 'translateX(-10%) translateY(-10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translate(0,0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger(
      'enterRightTop', [
      transition(':enter', [
        style({ transform: 'translateX(10%) translateY(-10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateX(0,0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
    trigger(
      'enterLeftBot', [
      transition(':enter', [
        style({ transform: 'translateX(-10%) translateY(10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateY(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ]),
    ]
    ),
    trigger(
      'enterRightBot', [
      transition(':enter', [
        style({ transform: 'translateX(10%) translateY(10%)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translateY(0.0)', opacity: 1, 'overflow-x': 'hidden' }))
      ])
    ]
    ),
  ]
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    title: {
      text: 'Top 5 Pièce Commnader',
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
      backgroundColor: '#d6a217',},
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
  public barChartData: ChartDataSets[] = [
    { data: [90], label: '5F1955426 ' },
    { data: [80], label: '5F1955426 ' },
    { data: [60], label: '5F1955426 ' },
    { data: [45], label: '5F1955426 ' },
    { data: [30], label: '5F1955426 ' },
  ];
  /***************************cercle******************** */

  public pieChartOptions: ChartOptions = {
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
  public pieChartLabels: Label[] = ['Command Stock ', 'Commande Ferme '];
  public pieChartData: number[] = [300, 500];
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
  public polarAreaChartData: SingleDataSet = [300, 500, 100];
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
      text: 'Comande Par Moin',
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
  public barChartLabels2: Label[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;

  public barChartData2: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: 'Commande Ferme' },
    { data: [28, 48, 40, 19, 86, 27, 90, 80, 81, 56, 55, 40], label: 'Comande Stock' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
