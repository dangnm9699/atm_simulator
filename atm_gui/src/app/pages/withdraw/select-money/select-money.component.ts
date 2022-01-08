import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-select-money',
  templateUrl: './select-money.component.html',
  styleUrls: ['./select-money.component.scss']
})
export class SelectMoneyComponent implements OnInit {

  replace: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  selectMoney(amount: Number){
    this.replace = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      if(amount > 1000000){
        this.navigateToFailScreen();
      }else{
        this.router.navigate(['/pages/confirm-transaction']);
      }
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
