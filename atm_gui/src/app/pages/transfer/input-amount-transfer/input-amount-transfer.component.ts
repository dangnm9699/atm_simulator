import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-input-amount-transfer',
  templateUrl: './input-amount-transfer.component.html',
  styleUrls: ['./input-amount-transfer.component.scss']
})
export class InputAmountTransferComponent implements OnInit {

  amount: Number = 0;
  minAmount: Number = 50000;
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  _userInfo = {}
  _transferInfo = {}
  bearer
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this._userInfo = JSON.parse(localStorage.getItem('_userInfo'))
    this._transferInfo = JSON.parse(localStorage.getItem('_transferInfo'))
    this.bearer = localStorage.getItem('httpHeaders')
    let headers = new HttpHeaders()
    // console.log(bearer, _userInfo, _userInfo["cardNumber"]);
    // if(bearer && _userInfo && _userInfo["cardNumber"]){
    //   this.userService.getCardDetail(_userInfo["cardNumber"], {Authorization: bearer}).subscribe(e =>{
    //     if(e.body["balance"]){
    //       this.accountBalance = e.body["balance"]
    //     } else {
    //       this.router.navigate["/404"];
    //     }
    //   });
    // }else{
    //   this.router.navigate["/404"];
    // }

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
    if(this.amount < 1000){
      return ;
    }
    this.replaceSuccess = true;
    this.userService.checkTransfer(this._userInfo["cardNumber"], this._transferInfo["number"], this.amount, { Authorization: this.bearer }).subscribe(e => {
      console.log(e.body);
      
      let transferInfo = {
        transferTo: this._transferInfo["name"],
        transferToAcc: this._transferInfo["number"],
        transferFromAcc: this._userInfo["cardNumber"],
        transferAmount: this.amount,
        remainingAmount: e.body
      }
      localStorage.setItem('_transferInfoConfirm', JSON.stringify(transferInfo))
      this.loginService.fakeApiPending(5000).subscribe(() => {
        this.router.navigate(['/pages/confirm-transfer']);
      }),
      () => {
        // this.replaceSuccess = false;
        // this.replaceFail = true;
        // this.loginService.fakeApiPending(3000).subscribe(e => {
        //   this.router.navigate(['/pages/confirm-transfer']);
        // })
        this.loginService.fakeApiPending(3000).subscribe(e => {
          this.router.navigate(['/pages/transaction-fail']);
        })
      }
    })
  }

  getLength(number) {
    return number.toString().length;
  }

  navigateToFailScreen() {
    this.router.navigate(['/pages/transaction-fail']);
  }

}
