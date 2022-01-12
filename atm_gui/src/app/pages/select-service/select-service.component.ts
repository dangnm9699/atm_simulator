import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {

  replace: boolean = false
  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  navigateSelectMoney() {

    this.router.navigate(["/pages/select-money"])
  }

  navigateCheckAccountBalance() {
    this.replace = true;
    this.loginService.fakeApiPending(5000).subscribe(e => {
      this.router.navigate(['/pages/check-account-balance']);
    })
  }

  select() {

  }


}
