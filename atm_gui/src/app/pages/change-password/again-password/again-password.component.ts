import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-again-password',
  templateUrl: './again-password.component.html',
  styleUrls: ['./again-password.component.scss']
})
export class AgainPasswordComponent implements OnInit {

  replaceFail: boolean = false;
  replaceSuccess: boolean = false;
  replaceSuccess2: boolean = false;
  replaceAgain: boolean = false;
  _userInfo: Object;
  bearer
  newPin: String;

  constructor(private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this._userInfo = JSON.parse(localStorage.getItem('_userInfo'));
    this.bearer = localStorage.getItem('httpHeaders')
    this.newPin = localStorage.getItem('npin')
  }

  cancelEvent(value) {
    this.replaceFail = true;
    this.loginService.fakeApiPending(3000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }

  submitEvent(value) {
    if(this.newPin != value){
      this.replaceAgain = true;
      setTimeout(() => {
        this.replaceAgain = false;
      },3000);
      return;
    }
    console.log(this._userInfo["cardNumber"]);
    
    if(this._userInfo["cardNumber"]){    
      this.replaceSuccess = true;
      this.loginService.changePassword(this._userInfo["cardNumber"], value , {Authorization: this.bearer}).pipe(delay(3000)).subscribe(e =>{   
        this.replaceSuccess = false;
        this.replaceSuccess2 = true
        this.loginService.fakeApiPending(3000).subscribe(() => {
          localStorage.clear();
          this.router.navigate(['auth/login']);}
        )
      }, err =>{
        setTimeout(()=>{
          this.router.navigate(["/404"])
        }, 4000);
      })
    }else{
      this.replaceSuccess = true;
      this.loginService.fakeApiPending(3000).subscribe(() =>{
        this.router.navigate(["/404"])
      })
    }
  }

  navigateToLogin(){
    this.router.navigate(["/auth/login"]);
  }

  enterAgain(){
    this.replaceAgain = false;
  }

}
