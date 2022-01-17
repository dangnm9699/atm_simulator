import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-check-account-balance',
  templateUrl: './check-account-balance.component.html',
  styleUrls: ['./check-account-balance.component.scss']
})
export class CheckAccountBalanceComponent implements OnInit {

  accountBalance : Number;
  replaceFail: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let _userInfo = JSON.parse(localStorage.getItem('_userInfo'))
    let bearer = localStorage.getItem('httpHeaders')
    let headers = new HttpHeaders()
    console.log(bearer, _userInfo, _userInfo["cardNumber"]);
    if(bearer && _userInfo && _userInfo["cardNumber"]){
      this.userService.getCardDetail(_userInfo["cardNumber"], {Authorization: bearer}).subscribe(e =>{
        if(e.body["balance"]){
          this.accountBalance = e.body["balance"]
        } else {
          this.router.navigate["/404"];
        }
      });
    }else{
      this.router.navigate["/404"];
    }
    
  }

  navigateSelectMoney() {
  }

  select(choice: boolean) {
    if (choice) {
      this.router.navigate(['/pages/select-service']);
      return;
    }
    this.replaceFail = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    })
  }

}
