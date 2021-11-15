import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subscribe: Subject<any>;

  constructor() {
    this.subscribe = webSocket('ws://localhost:3000');
  }

  initialize() {
    return this.subscribe;
  }

  emit(eventName: string, data: any) {
    this.subscribe.next({ event: eventName, data: data });
  }
}
