import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  txt = 'angular-app';

  constructor(private service: WebsocketService) {}

  ngOnInit() {
    this.service.initialize().subscribe((res) => {
      console.log(res);
    });
  }

  Send() {
    this.service.emit('message', this.txt);
  }
}
