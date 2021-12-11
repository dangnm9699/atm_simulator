import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-result',
  templateUrl: './transaction-result.component.html',
  styleUrls: ['./transaction-result.component.scss']
})
export class TransactionResultComponent implements OnInit {

  amount = {
    "m500": 5,
    "m200": 1,
    "m100": 2,
    "m50": 1,
    "m20": 4,
    "m10": 3
  }
  money: Array<string> = []
  animation: Array<string> = []
  constructor() { }

  ngOnInit(): void {
    for (let i of Object.keys(this.amount)) {
      switch (i) {
        case "m500":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("500k")]);
          break;
        case "m200":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("200k")]);
          break;
        case "m100":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("100k")]);
          break;
        case "m50":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("50k")]);
          break;
        case "m20":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("20k")]);
          break;
        case "m10":
          this.money = this.money.concat([...Array(Number(this.amount[i])).fill("10k")]);
          break;
      }
    }

    console.log(this.money);

    this.money.forEach((obj, index) => {
      setTimeout(() => {
        this.animation.push(obj)
      }, 1000 * (index + 1));
    });
  }
}
