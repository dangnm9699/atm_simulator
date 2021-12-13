import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.scss']
})
export class ValidatePinComponent implements OnInit {

  amount: String = "";
  show: String = ""
  blink: String = "_"
  blank: String = "-----"
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  user = {
    userName: "Phạm Văn Chung"
  }
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async numpadTrigger(value) {
    if (Number(value) != value || (this.amount + String(value)).length > 6) {
      return;
    }
    
    this.blink = String(value)
    await this.timeout(500)
    this.blink = "_"
    this.amount = this.amount + String(value)
    this.show = '*'.repeat(this.amount.length)
    this.blank = '-'.repeat((5 - this.amount.length) < 0 ? 0 : (5 - this.amount.length))
    
    if(this.amount.length >5){
      this.blink = ""
      this.blank = ""
    }
    return;
  }

  deleteTrigger(value) {
    this.amount = this.amount.slice(0, this.amount.length - 1)
    this.show = '*'.repeat(this.amount.length)
    this.blank = '-'.repeat((5 - this.amount.length) < 0 ? 0 : (5 - this.amount.length))
    this.blink = "_"
  }

  cancelTrigger(value) {
    this.replaceFail = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }

  submitTrigger(value) {
    if (this.amount.length != 6) {
      return;
    } else {
      this.replaceSuccess = true;
      this.loginService.fakeApiPending(5000).subscribe(e => {
        this.router.navigate(['/pages/select-service']);
      })
    }
  }

  timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
