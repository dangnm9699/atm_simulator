import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  // amount: String = "9704220123456789";
  amount: String = "";
  minAmount: Number = 30000;
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  replaceSuccess2: boolean = false;
  title = {
    accNumber : "",
    times: 3
  }
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  numpadTrigger(value) {
    if (Number(value) != value || (String(this.amount) + String(value)).length > 16) {
      return;
    }
    this.amount = String(this.amount) + String(value)
    return;
  }

  deleteTrigger(value) {
    this.amount = String(this.amount).slice(0, -1)
  }

  cancelTrigger(value) {
    this.replaceFail = true;
    this.loginService.fakeApiPending(3000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }

  submitTrigger(value) {
    if (this.amount.length < 16) {
      return;
    }
    this.replaceSuccess = true;
    let bearer = localStorage.getItem('httpHeaders')
    this.loginService.fakeApiPending(3000).subscribe(e => {
      this.userService.getCardDetail(this.amount, { Authorization: bearer }).subscribe(e => {
        if (e.body && e.body["name"]) {
          localStorage.setItem('_transferInfo', JSON.stringify(e.body));
          this.router.navigate(['/pages/input-amount-transfer']);
        } else {
          this.router.navigate(['/404']);
        }
      }, () => {
        this.replaceSuccess = false;
        this.replaceSuccess2 = true;
        this.title.accNumber = this.amount.toString();
        this.loginService.fakeApiPending(3000).subscribe(e => {
          this.amount = "" ;
          this.replaceSuccess2 = false;
        })
      });
    })
  }

  getLength(number) {
    return number.toString().length;
  }

  navigateToFailScreen() {
    this.router.navigate(['/pages/transaction-fail']);
  }

}
