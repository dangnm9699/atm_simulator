import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <div id="motherBox">
    <app-header></app-header>
    <div id="body">
      <router-outlet></router-outlet>
    </div>
    <div id="footer">
      <app-footer></app-footer>
    </div>
  </div>
  `,
  styles:["#motherBox{height: calc(100% - 40px) } #body {margin: 0;box-sizing: border-box; height: 100%; overflow: hidden; background: #b0bec5} #footer{ background: #b0bec5}"]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
