import { Component, OnInit } from '@angular/core';
import {Header} from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  header = new Header();

  constructor() { }

  ngOnInit() {
  }

  clickSearch(){

  }

  clickPlay(){

  }
}

