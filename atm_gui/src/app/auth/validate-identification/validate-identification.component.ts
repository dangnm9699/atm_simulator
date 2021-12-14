import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, timer, throwError } from 'rxjs';
import { catchError, delay, takeUntil } from 'rxjs/operators';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-validate-identification',
  templateUrl: './validate-identification.component.html',
  styleUrls: ['./validate-identification.component.scss']
})
export class ValidateIdentificationComponent implements OnInit {

  file: File = null;
  dateTime: String;
  replace: boolean = false;
  replaceFail: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const sub = timer(0, 1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dateTime = new Date(Date.now()).toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    })
  }


  onSelect(event) {
    if (this.file && this.file.type == "application/pdf") {
      let obj = {
        userName: "bttvtt.adm",
        passwordHash: "Moit@2020",
        remember: "true",
      }
    } else {
      let obj = {
        userName: "admin.moit",
        passwordHash: "Moit@2020",
        remember: "true",
      }
      this.file = event.addedFiles[0];
      this.replace = true;
      this.loginService.login(obj).pipe(delay(4000)).subscribe(res => {
        if (res.status === 200) {
          localStorage.setItem('objects', JSON.stringify(res.body.listObjects));
          localStorage.setItem('httpHeaders', res.body.httpHeaders.Authorization);
          localStorage.setItem('users', res.body.customUserDetails.fullName);
          localStorage.setItem('userDetails', JSON.stringify(res.body.customUserDetails));
        }
        this.router.navigate(["/auth/pin"])
      }, err => {
        this.replace=false
        this.replaceFail=true
      }
      );
    }
    // this.router.navigate(["/auth/pin"])
  }

  onRemove(event) {
    this.file = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
