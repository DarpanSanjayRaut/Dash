import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataSharingService } from './services/data.service';
import {HttpClientModule, HttpClient } from '@angular/common/http';
import {SocketService} from './services/socket.service'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DataSharingService, SocketService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
