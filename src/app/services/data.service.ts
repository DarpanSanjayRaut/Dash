import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {

  
 
  private httpHeader = new HttpHeaders()
    .set('content-type', 'application/json');

  constructor(private http: HttpClient) {

  }
  
  private logs = new BehaviorSubject<any>([]);
  log = this.logs.asObservable();


  changelog(log) {
    this.logs.next(log)
  }

  getBatteryStats(token: string) {
    const httpHeader = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.get('http://localhost:8080' + '/api/v1/list', { headers: httpHeader });
  }

  uploadFile(formData: any) {
    const httpHeader = new HttpHeaders()
      .set('content-type', 'application/json')
    //return this.http.get('http://localhost:8080' + '/upload' , {headers: httpHeader});
    return this.http.post('http://localhost:8080' + '/api/v1/upload', formData, { headers: httpHeader })
  }
}
