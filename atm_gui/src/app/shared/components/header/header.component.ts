import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    console.log('logout');
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  selectLang(){
    this.translateService.setDefaultLang('en');
  }
}
