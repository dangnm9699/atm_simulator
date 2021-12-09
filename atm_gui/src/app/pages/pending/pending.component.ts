import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  @Input() textInput: string ; 
  @Input() isHideOrNot: boolean = true;
  constructor() { }

  ngOnInit(): void {
    console.log("peding");
  }

}
