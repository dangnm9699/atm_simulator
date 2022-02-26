import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

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
  bearer
  _userInfo
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this._userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.bearer = localStorage.getItem('httpHeaders')
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
      this.userService.checkWithdraw(this._userInfo["cardNumber"], this.amount, { Authorization: this.bearer }).subscribe(e =>{
        let withdraw = {
          withdrawAmount: this.amount,
          leftAmount: e.body,
          cardNumber: this._userInfo["cardNumber"] 
        }
        localStorage.setItem('_withdrawInfoConfirm', JSON.stringify(withdraw))
        this.router.navigate(['/pages/confirm-transaction']);
      },
      () => {
        this.replaceSuccess = false
        this.replaceFail = true
      })
    })

  }

  getLength(number) {
    return number.toString().length;
  }

  navigateToFailScreen() {
    this.router.navigate(['/pages/transaction-fail']);
  }
}
