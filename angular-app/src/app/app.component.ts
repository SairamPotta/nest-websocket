import { Component, OnInit } from '@angular/core';
import { AppService } from './websocket/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  constructor(private service: AppService) {
    console.log('Called this');
  }

  public ngOnInit() {
    this.service.listen('message').subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('err', err);
      },
      () => {
        console.log('completed');
      }
    );
  }

  public trigger() {
    this.service.emit('message', 'Working');
  }
}
