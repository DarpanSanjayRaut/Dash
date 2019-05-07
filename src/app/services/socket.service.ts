import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { DataSharingService } from './data.service';

@Injectable()
export class SocketService {

    private socket: SocketIOClient.Socket;
    private info: any;

    constructor(private DataSharingService:DataSharingService) { }

    initSocket() {
        this.socket = io("http://localhost:8080");
        console.log('socket initialized');
        this.onConnect();
    }

    onConnect() {
        this.socket.on('connect', (data) => {
            console.log('socket connection established');

            this.socket.on('uploaded', (data) => {
                console.log('socket uploaded' + JSON.stringify(data));
                this.DataSharingService.changelog(data)
            });
            this.socket.on('disconnect', () => {
                console.log('socket disconnected');
            });
        });

    }

    getSocket() {
        if (this.socket) {
           return this.socket;
        }
        return null;
    }
}
