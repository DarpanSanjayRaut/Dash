import { Injectable } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from './services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart: any;

  message: any;
  logs: any;
  constructor(private socketService: SocketService, private el: ElementRef, private http: HttpClient, private router: Router, private dataSharingService: DataSharingService) {
    this.logs = []
    this.socketService.initSocket();

    this.dataSharingService.getBatteryStats("ok")
      .subscribe(data => {
        console.log(JSON.stringify(data))
      },
        err => {
          console.log(JSON.stringify(err))
        });

  }


  ngOnInit() {
    this.dataSharingService.log.subscribe(res => {
      console.log(res)
      
      // this.getChart({x : res.val}, {y :res.ts})

      this.logs.push(res)

    });
    // this.dataSharingService.changelog(this.logs);
  }

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#ph');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    console.log(fileCount + "fileCount")
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        console.log('loop' + fileCount + inputEl.files.item(i))
        formData.append('file', inputEl.files.item(i));
      }

      this.message = "Please wait"
      const httpHeader = new HttpHeaders()
      this.http.post('http://localhost:8080' + '/api/v1/upload', formData, { headers: httpHeader })
        .subscribe(data => {
          console.log(JSON.stringify(data) + "upload")
          this.message = "FILE HAS BEEN UPLOADED"

        },
          err => {
            console.log(JSON.stringify(err))
          });
    }
  }


  getDate(ts) {
    return new Date(ts)
  }


  // getChart(x, y) {

  //   this.chart = new Chart('canvas', {
  //     type: 'line',
  //     data: {
  //       labels: [],
  //       datasets: [
  //         {
  //           data: y,
  //           borderColor: "#3cba9f",
  //           fill: false
  //         },
  //         {
  //           data: x,
  //           borderColor: "#ffcc00",
  //           fill: false
  //         },
  //       ]
  //     },
  //     options: {
  //       legend: {
  //         display: false
  //       },
  //       scales: {
  //         xAxes: [{
  //           display: true
  //         }],
  //         yAxes: [{
  //           display: true
  //         }],
  //       }
  //     }
  //   });

  //   return this.chart
  // }

}
