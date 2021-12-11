import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.scss']
})
export class InputMoneyComponent implements OnInit {

  @ViewChild('reff') reff: ElementRef;
  @ViewChild('replaceComponent') replaceComponent: ElementRef;
  replace: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  numpadTrigger(value) {
    return;
  }

  cancelTrigger(value) {
    this.replace = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }
}
