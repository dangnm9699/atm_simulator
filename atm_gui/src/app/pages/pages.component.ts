import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <div id="motherBox">
    <div id="body">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  </div>
  `,
  styles:["#motherBox{height: 100%} #body {margin: 0;box-sizing: border-box; height: 100%; overflow: hidden; background: #4abdac; font-size:3vw; font-weight: bold} "]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // <app-header></app-header> calc(100% - 40px
  }

}
