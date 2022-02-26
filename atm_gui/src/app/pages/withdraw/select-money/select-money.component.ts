import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-money',
  templateUrl: './select-money.component.html',
  styleUrls: ['./select-money.component.scss']
})
export class SelectMoneyComponent implements OnInit {

  replace: boolean = false;
  bearer
  _userInfo
  replaceFail
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this._userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.bearer = localStorage.getItem('httpHeaders')
  }

  handleClickEvent($event) {
    this.router.navigate(['/pages/another-service']);
  }

  selectMoney(amount: Number){
    this.replace = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      this.userService.checkWithdraw(this._userInfo["cardNumber"], amount, { Authorization: this.bearer }).subscribe(e =>{
        let withdraw = {
          withdrawAmount: amount,
          leftAmount: e.body,
          cardNumber: this._userInfo["cardNumber"] 
        }
        localStorage.setItem('_withdrawInfoConfirm', JSON.stringify(withdraw))
        this.router.navigate(['/pages/confirm-transaction']);
      },
      () => {
        this.replace = false
        this.replaceFail = true
      })
    })
  }

  selectOtherAmount(){
    this.replace = true;
    this.loginService.fakeApiPending(2000).subscribe(e => {
      this.router.navigate(['/pages/input-money']);
    })
  }

  cancelTrigger(value) {
    
  }

  navigateToFailScreen(){
    this.router.navigate(['/pages/transaction-fail']);
  }
}
