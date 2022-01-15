import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private loginService: LoginService,
    private  translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('vi');
    const sub = timer(0, 1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dateTime = new Date(Date.now()).toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    })
  }


  // onSelect(event) {
  //   if (this.file && this.file.type == "application/pdf") {
  //     let obj = {
  //       userName: "bttvtt.adm",
  //       passwordHash: "Moit@2020",
  //       remember: "true",
  //     }
  //   } else {
  //     let obj = {
  //       userName: "admin.moit",
  //       passwordHash: "Moit@2020",
  //       remember: "true",
  //     }
  //     this.file = event.addedFiles[0];
  //     this.replace = true;
  //     this.loginService.login(obj).pipe(delay(4000)).subscribe(res => {
  //       if (res.status === 200) {
  //         localStorage.setItem('objects', JSON.stringify(res.body.listObjects));
  //         localStorage.setItem('httpHeaders', res.body.httpHeaders.Authorization);
  //         localStorage.setItem('users', res.body.customUserDetails.fullName);
  //         localStorage.setItem('userDetails', JSON.stringify(res.body.customUserDetails));
  //       }
  //       this.router.navigate(["/auth/select-language"])
  //     }, err => {
  //       this.replace=false
  //       this.replaceFail=true
  //     }
  //     );
  //   }
  //   // this.router.navigate(["/auth/select-language"])
  // }

  onSelect(event) {
    this.file = event.addedFiles[0];
    this.replace = true;
    if (this.file && this.file.type == "application/pdf") {
      console.log(2);
      
      this.loginService.fakeApi(6000).pipe(delay(6000)).subscribe(res => {
        console.log(1);
        
        this.router.navigate(["/auth/select-language"])
      }, err => {
        console.log(3);
        
        this.replace=false
        this.replaceFail=true
      });
      return ;
    }
    this.loginService.fakeApiPending(5000).subscribe((e) =>{
      console.log(e.body);
      
      this.router.navigate(["/auth/select-language"])
    })
    // this.router.navigate(["/auth/select-language"])
  }

  onRemove(event) {
    this.file = null;
  }

  navigateToLogin(){
    this.router.navigate(["/auth/login"]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
