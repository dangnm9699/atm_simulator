import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'
// import { UserService } from "src/app/services/user.service";

import{checkUser,notSpaceLogin} from '../../validators'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  inputUser: FormGroup;
  isLoad: boolean;
  submitted: boolean;
  tenantId: any;

  initForm() {
    this.inputUser = new FormGroup({
      userName: new FormControl(this.getCookie('userName'), [checkUser, Validators.maxLength(50), Validators.required]),
      passwordHash: new FormControl(this.getCookie('passwordHash'), [notSpaceLogin, Validators.minLength(6), Validators.maxLength(60), Validators.required]),
      remember: new FormControl(this.getCookie('remember'), []),
    });
  }

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private loginService: LoginService
  ) { }

  ngOnInit(){
    this.initForm()
    this.inputUser.get('userName').valueChanges.subscribe(res =>{
      console.log("input values change",res);
      
    })
  }

  login(emailInput) {
    // this.userService.login(this.email, this.password).subscribe(
    //   (user) => {
    //     this.userService.setAuthToken(user.token);
    //     this.router.navigateByUrl(this.userService.redirectUrl);
    //   },
    //   (err) => {
    //     this.snackBar.open(err.error.message || err.message, "", {
    //       duration: 2000,
    //     });
    //   }
    // );

  }

  getTenantId() {
    this.loginService.getTenant().subscribe(res => {
      this.tenantId = res.body;
      if (this.tenantId === 1) {
        this.router.navigate(['/pages/sys-config/sys-home']);
      } else {
        this.router.navigate(['/pages/report/manager']);
      }
      localStorage.setItem('tenantId', this.tenantId);
    });
  }

  onSubmit() {
    if (this.inputUser.valid) {
      if (this.inputUser.value.remember) {
        document.cookie = 'userName=' + this.inputUser.value.userName;
        document.cookie = 'passwordHash=' + this.inputUser.value.passwordHash;
        document.cookie = 'remember=' + true;
      } else {
        document.cookie = 'userName=' + '';
        document.cookie = 'passwordHash=' + '';
        document.cookie = 'remember=' + false;
      }
      this.loginService.login(this.inputUser.value).subscribe(res => {
        this.submitted = false;
        if (res.status === 200) {
          console.log("request POST success");
          
          localStorage.setItem('objects', JSON.stringify(res.body.listObjects));
          localStorage.setItem('httpHeaders', res.body.httpHeaders.Authorization);
          localStorage.setItem('users', res.body.customUserDetails.fullName);
          localStorage.setItem('userDetails', JSON.stringify(res.body.customUserDetails));
          this.isLoad = false;
          // this.getTenantId();
          this.router.navigate(['/pages/home']);
        }
      }, err => {
        let body: any;
        try {
          body = err.error.detail;
        } catch {
          body = '';
        } finally {
          this.snackBar.open(err.error.message || err.message, "", { duration: 2000 })
        }
      });
    } else {
      this.isLoad = false;
    }
  }


  // get Cookie for remember password
  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}