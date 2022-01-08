import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit {
  
  replaceFail: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  navigateSelectMoney() {
  }

  select(choice: boolean) {
    if (choice) {
      this.loginService.fakeApiPending(0).subscribe(e => {
        this.router.navigate(['/pages/transaction-result']);
      })
      return;
    }
    this.replaceFail = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['/pages/transaction-result']);
    })
  }

}
