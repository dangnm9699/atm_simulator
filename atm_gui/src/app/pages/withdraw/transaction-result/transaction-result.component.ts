import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-result',
  templateUrl: './transaction-result.component.html',
  styleUrls: ['./transaction-result.component.scss']
})
export class TransactionResultComponent implements OnInit {

  amount = {
    "n_500": 0,
    "n_200": 0,
    "n_100": 0,
    "n_50": 0,
    "n_20": 0,
    "n_10": 0
  }
  money: Array<string> = []
  animation: Array<string> = []
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.amount = JSON.parse(localStorage.getItem('_withdrawATMInfo'))
    if( ! this.amount["payload"] ){
      this.router.navigate(['/404']);
    }
    this.amount = this.amount["payload"]
    console.log(this.amount);
    
    for (let i of Object.keys(this.amount)) {
      switch (i) {
        case "n_500":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("500k")]);
          break;
        case "n_200":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("200k")]);
          break;
        case "n_100":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("100k")]);
          break;
        case "n_50":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("50k")]);
          break;
        case "n_20":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("20k")]);
          break;
        case "n_10":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("10k")]);
          break;
      }
    }
    this.money.forEach((obj, index) => {
      setTimeout(() => {
        this.animation.push(obj)
      }, 1000 * (index + 1));
    });
  }

  getOut(){
    this.router.navigate(["/pages/another-service"])
  }
}
