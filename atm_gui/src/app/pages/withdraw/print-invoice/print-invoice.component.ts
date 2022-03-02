import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit {
  
  replaceFail: boolean = false;
  bearer
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.bearer = localStorage.getItem('httpHeaders')
  }

  navigateSelectMoney() {
  }

  select(choice: boolean) {
    if (choice) {
      const _printInfo = JSON.parse(localStorage.getItem("_printInfo"))
      if(_printInfo['amount'] || _printInfo['created_at'] || _printInfo['src_card']){
        localStorage.setItem("_printInfo",null)
        this.userService.printInvoice(_printInfo['amount'], _printInfo['created_at'], _printInfo['src_card'], _printInfo['dst_card'], {Authorization: this.bearer}).subscribe( e => {
          if(e.body['receipt_link']){
            this.userService.downloadInvoice(e.body['receipt_link'], {Authorization: this.bearer}).subscribe(blob =>{
              saveAs(blob, "invoice.pdf")
              this.router.navigate(["/pages/another-service"])
            })
          }
        })
      }
      return ;
    }
    this.router.navigate(["/pages/another-service"])
  }

  handleClickEvent(){
    this.router.navigate(["/pages/another-service"])
  }
}
