import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <div id="motherBox">
    <div id="body">
      <router-outlet></router-outlet>
    </div>
    <div id="footer">
      <app-footer></app-footer>
    </div>
  </div>
  `,
  styles:["#motherBox{height: 100%} #body {margin: 0;box-sizing: border-box; height: 100%; overflow: hidden; background: #b0bec5; font-size:3vw; font-weight: bold} #footer{ background: #b0bec5}"]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // <app-header></app-header> calc(100% - 40px
  }

}
