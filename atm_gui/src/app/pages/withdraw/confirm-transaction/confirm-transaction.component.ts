import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirm-transaction',
  templateUrl: './confirm-transaction.component.html',
  styleUrls: ['./confirm-transaction.component.scss'],
  providers: [
    CurrencyPipe
  ],
})
export class ConfirmTransactionComponent implements OnInit {

  amount = {
    'withdrawAmount': this.currencyPipe.transform(1550000, 'VND'),
    'leftAmount': this.currencyPipe.transform(12450000, 'VND')
  }
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  constructor(
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  navigateSelectMoney() {
  }

  select(choice: boolean) {
    if (choice) {
      this.replaceSuccess = true;
      this.loginService.fakeApiPending(5000).subscribe(e => {
        this.router.navigate(['/pages/transaction-result']);
      })
      return;
    }
    this.replaceFail = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    })
  }
}
