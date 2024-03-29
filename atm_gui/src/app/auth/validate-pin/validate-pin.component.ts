import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.scss']
})
export class ValidatePinComponent implements OnInit {

  wrong={
    wrongTimes: 1
  }
  amount: String = "";
  show: String = ""
  blink: String = "_"
  blank: String = "-----"
  replaceFail: boolean = false;
  replaceFail2: boolean = false;
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

  cancelTrigger(value) {
    this.replaceFail = true;
    this.loginService.fakeApiPending(3000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }

  submitTrigger(value) {
    if (this.amount.length != 6) {
      return;
    }
    if(this._userInfo["cardNumber"]){    
      this.replaceSuccess = true;
      this.loginService.authenticate({number:this._userInfo["cardNumber"], pinHash:this.amount}).pipe(delay(4000)).subscribe(e =>{       
        localStorage.setItem('httpHeaders', e.body["tokenType"] + " " + e.body["accessToken"]);
        this.router.navigate(['/pages/select-service']);
      }, err =>{
        this.replaceSuccess = true;
        setTimeout(()=>{
          this.replaceSuccess = false;
          this.replaceFail2 = true;
          setTimeout(() => {
            localStorage.clear();
            this.router.navigate(["/auth/login"])
          },3000);
        }, 4000);
      })
    }else{
      this.replaceSuccess = true;
      this.loginService.fakeApiPending(3000).subscribe(() =>{
        this.replaceSuccess = false;
        this.replaceFail = true;
      })
    }
  }

  navigateToLogin(){
    this.router.navigate(["/auth/login"]);
  }

  timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
