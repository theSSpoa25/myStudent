import { Component, OnInit } from '@angular/core';
import { LoginResponse } from './_models/authentication/LoginResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';
  user: any  | LoginResponse;

  constructor(
  ) {
  }

  ngOnInit() {
    
  }
}
