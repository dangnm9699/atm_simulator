import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-check-account-balance',
  templateUrl: './check-account-balance.component.html',
  styleUrls: ['./check-account-balance.component.scss']
})
export class CheckAccountBalanceComponent implements OnInit {

  accountBalance : Number = 12450000;
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
        this.router.navigate(['/pages/select-service']);
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
