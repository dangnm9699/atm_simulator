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

  amount: Number = 0;
  minAmount: Number = 50000;
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  numpadTrigger(value) {
    if (Number(value) != value || this.getLength(Number(String(this.amount) + String(value))) > 8) {
      return;
    }
    this.amount = Number(String(this.amount) + String(value))
    return;
  }

  deleteTrigger(value) {
    this.amount = Number(String(this.amount).slice(1))
  }

  cancelTrigger(value) {
    this.replaceFail = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }

  submitTrigger(value) {
    this.replaceSuccess = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      this.router.navigate(['/pages/confirm-transaction']);
    })
  }

  getLength(number) {
    return number.toString().length;
  }
}
