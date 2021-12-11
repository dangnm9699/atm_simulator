import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateSelectMoney(){
    this.router.navigate(["/pages/select-money"])
  }

  select(){

  }

}
