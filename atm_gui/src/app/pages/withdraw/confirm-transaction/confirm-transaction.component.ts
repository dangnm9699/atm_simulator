import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

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
    withdrawAmount: this.currencyPipe.transform(1550000, 'VND'),
    leftAmount: this.currencyPipe.transform(12450000, 'VND')
  }
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  bearer
  constructor(
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.amount = JSON.parse(localStorage.getItem('_withdrawInfoConfirm'))
    this.amount.withdrawAmount = this.currencyPipe.transform(this.amount.withdrawAmount, 'VND')
    this.amount.leftAmount = this.currencyPipe.transform(this.amount.leftAmount, 'VND')
    this.bearer = localStorage.getItem('httpHeaders')
  }

  navigateSelectMoney() {
  }

  select(choice: boolean) {
    if (choice) {
      this.replaceSuccess = true;
      const withdrawInfo = JSON.parse(localStorage.getItem('_withdrawInfoConfirm'))
      if( ! withdrawInfo["cardNumber"] && withdrawInfo["withdrawAmount"]){
        this.router.navigate(['/404']);
      }
      this.loginService.fakeApiPending(500).subscribe(e => {
        this.userService.withdrawATM(withdrawInfo["cardNumber"], withdrawInfo["withdrawAmount"], { Authorization: this.bearer }).subscribe(e =>{
          localStorage.setItem('_withdrawATMInfo', JSON.stringify(e.body))
          this.router.navigate(['/pages/transaction-result']); 
        },
        () => {
          this.replaceSuccess = false
          this.replaceFail = true
        })
        
      })
      return;
    }
    this.router.navigate(['/pages/another-service']);
  }
}
