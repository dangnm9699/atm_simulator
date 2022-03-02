import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div id="body">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles:["#body {margin: 0;box-sizing: border-box; height: 100%; overflow: hidden; background: #4abdac; font-size:3vw; font-weight: bold} "]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("auth");
    
  }

}
