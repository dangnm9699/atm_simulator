import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-receipt',
  templateUrl: './show-receipt.component.html',
  styleUrls: ['./show-receipt.component.scss'],
  providers: [
    CurrencyPipe
  ],
})
export class ShowReceiptComponent implements OnInit {

  receipt_type
  amount
  created_at
  src_card
  dst_card
  fee
  balance
  name
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.receipt_type = +this.route.snapshot.paramMap.get('receipt_type');
    this.amount = this.currencyPipe.transform(this.route.snapshot.paramMap.get('amount'), 'VND');
    this.created_at = this.route.snapshot.paramMap.get('created_at');
    this.src_card = this.route.snapshot.paramMap.get('src_card');
    this.dst_card = this.route.snapshot.paramMap.get('dst_card');
    this.fee = this.currencyPipe.transform(Math.min(50000, Math.max(3000, Number.parseFloat(this.route.snapshot.paramMap.get('amount')) / 1000)).toString(), 'VND');

    if(this.receipt_type){
      const _userInfo = JSON.parse(localStorage.getItem('_userInfo'))
      this.name = _userInfo['name']
      const _transferInfo = JSON.parse(localStorage.getItem("_transferInfo"))
      this.balance = _transferInfo['balance']
    } else {
      const _userInfo = JSON.parse(localStorage.getItem('_userInfo'))
      this.name = _userInfo['name']
      const _withdrawInfoConfirm = JSON.parse(localStorage.getItem('_withdrawInfoConfirm'))
      this.balance =this.currencyPipe.transform(Number.parseFloat(_withdrawInfoConfirm['leftAmount']), 'VND')
    }
  }

  handleClickEvent(){
    this.router.navigate(["/pages/another-service"])
  }
}
