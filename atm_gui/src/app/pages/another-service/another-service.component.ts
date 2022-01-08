import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-another-service',
  templateUrl: './another-service.component.html',
  styleUrls: ['./another-service.component.scss']
})
export class AnotherServiceComponent implements OnInit {

  replaceFail: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  navigateSelectMoney() {
  }

  select(choice: boolean) {
    if (choice) {
      this.loginService.fakeApiPending(0).subscribe(e => {
        this.router.navigate(['/pages/select-service']);
      })
      return;
    }
    this.replaceFail = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    })
  }
}
