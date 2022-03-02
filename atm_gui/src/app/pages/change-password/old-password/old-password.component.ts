import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-old-password',
  templateUrl: './old-password.component.html',
  styleUrls: ['./old-password.component.scss']
})
export class OldPasswordComponent implements OnInit {

  replaceFail: boolean = false;
  replaceFail2: boolean = false;
  replaceSuccess: boolean = false;
  _userInfo: Object;

  constructor(private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this._userInfo = JSON.parse(localStorage.getItem('_userInfo'));
  }

  cancelEvent(value) {
    this.replaceFail = true;
    this.loginService.fakeApiPending(3000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
    })
  }

  submitEvent(value) {
    if(this._userInfo["cardNumber"]){    
      this.replaceSuccess = true;
      this.loginService.authenticate({number:this._userInfo["cardNumber"], pinHash:value}).pipe(delay(3000)).subscribe(e =>{       
        // localStorage.setItem('httpHeaders', e.body["tokenType"] + " " + e.body["accessToken"]);
        this.router.navigate(['/pages/new-password']);
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
        this.router.navigate(["/404"])
      })
    }
  }

  navigateToLogin(){
    this.router.navigate(["/auth/login"]);
  }

}
