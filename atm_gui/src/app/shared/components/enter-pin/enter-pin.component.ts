import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss']
})
export class EnterPinComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  wrong={
    wrongTimes: 1
  }
  amount: String = "";
  show: String = ""
  blink: String = "_"
  blank: String = "-----"
  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  _userInfo: Object;
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }
  ngOnInit(): void {
    this._userInfo = JSON.parse(localStorage.getItem('_userInfo'));    
  }

  async numpadTrigger(value) {
    if (Number(value) != value || (this.amount + String(value)).length > 6) {
      return;
    }
    
    this.blink = String(value)
    // await this.timeout(500)
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

  submitTrigger(value) {
    if (this.amount.length != 6) {
      return;
    }
    this.submitEvent.emit(this.amount);
  }

  cancelTrigger(value) {
    this.cancelEvent.emit();
  }

  navigateToLogin(){
    this.router.navigate(["/auth/login"]);
  }

  timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}
