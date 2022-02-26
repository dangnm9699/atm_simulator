import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-screen',
  templateUrl: './notification-screen.component.html',
  styleUrls: ['./notification-screen.component.scss']
})
export class NotificationScreenComponent implements OnInit {

  @Input() textInput: string ;
  @Input() colorCode: Number = 1; //1 ma xanh, 0 ma do  
  @Output() clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onScreenClick(){
    this.clickEvent.emit()
  }
}
