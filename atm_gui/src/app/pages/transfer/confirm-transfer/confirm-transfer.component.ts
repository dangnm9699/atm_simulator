import { CurrencyPipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-transfer',
  templateUrl: './confirm-transfer.component.html',
  styleUrls: ['./confirm-transfer.component.scss'],
  providers: [CurrencyPipe]
})
export class ConfirmTransferComponent implements OnInit {

  accountBalance : Number;
  replaceSuccess: boolean = false;
  replaceSuccess2: boolean = false;
  bearer
  transferInfo
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private currencyPipe:CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.transferInfo = JSON.parse(localStorage.getItem('_transferInfoConfirm'))
    this.transferInfo.transferAmount = this.currencyPipe.transform(this.transferInfo.transferAmount, 'VND')
    this.transferInfo.remainingAmount = this.currencyPipe.transform(this.transferInfo.remainingAmount, 'VND')
    this.bearer = localStorage.getItem('httpHeaders')
  }

  handleClickEvent($event) {
    this.router.navigate(['/pages/another-service']);
  }

  select(choice: boolean) {
    if (choice) {
      this.replaceSuccess = true;
      const transferInfo = JSON.parse(localStorage.getItem('_transferInfoConfirm'))
      if( ! transferInfo["transferFromAcc"] && transferInfo["transferToAcc"] && this.transferInfo["transferAmount"]){
        this.router.navigate(['/404']);
      }
      this.userService.transfer(transferInfo["transferFromAcc"], transferInfo["transferToAcc"], transferInfo["transferAmount"], { Authorization: this.bearer }).subscribe(() => {
        this.loginService.fakeApiPending(5000).subscribe(e => {
          this.replaceSuccess = false;
          this.replaceSuccess2 = true;
        })
      })
      return;
    }
    this.router.navigate(['/pages/another-service']);
  }

}
