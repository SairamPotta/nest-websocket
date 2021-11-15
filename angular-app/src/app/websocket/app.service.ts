import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public socket: io.Socket;
  private readonly uri = 'ws://localhost:3200/';

  constructor() {
    this.socket = io.connect(this.uri);
    this.socket.on('message', (res) => {
      console.log(res);
    });
    setTimeout(() => {
      this.emit('message', 'Hello');
    }, 1500);
  }

  public listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        console.log('called this event');
        console.log(data);
        observer.next(data);
        observer.complete();
      });
    });
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
