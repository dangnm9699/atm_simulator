import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  
  @Input() textInput: string ; 
  @Input() colorCode: Number = 1; //1 ma xanh, 0 ma do  
  constructor() { }

  ngOnInit(): void {
  }

}
