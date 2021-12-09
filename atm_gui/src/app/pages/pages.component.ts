import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <app-header></app-header>
  <div id="body">
    <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>
  `,
  styles:[":host ::ng-deep #body {margin: 0;box-sizing: border-box; height: calc(100% - 115px); overflow: hidden; background: #b0bec5"]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
