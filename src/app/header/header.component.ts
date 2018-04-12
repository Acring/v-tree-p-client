import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
declare var require: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() header: Header;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() play: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  clickSearch(){
    this.router.navigate(['/home/search']);
  }

  clickPlay(){
    this.router.navigate(['/home/play']);
  }
}

export class Header{
  headerImg: string = require('../../assets/img/gumtree.png');
  searchUrl: string = '/home/search';
  playUrl: string = 'home/play';
}
