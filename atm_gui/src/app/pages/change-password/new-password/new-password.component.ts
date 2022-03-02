import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  replaceFail: boolean = false;
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
    localStorage.setItem('npin', value);
    this.replaceSuccess = true;
    this.loginService.fakeApiPending(2000).subscribe(e => {
      this.router.navigate(['/pages/again-password']);
    })
  }

  navigateToLogin() {
    this.router.navigate(["/auth/login"]);
  }

}
