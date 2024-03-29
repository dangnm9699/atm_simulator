import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent implements OnInit {
  @Output() numpadSignal = new EventEmitter<any>();
  @Output() cancelSignal = new EventEmitter<any>();
  @Output() deleteSignal = new EventEmitter<any>();
  @Output() submitSignal = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitBtn(btn: string) {
    switch (btn) {
      case 'cancel':
        this.cancelSignal.emit();
        break;
      case 'delete':
        this.deleteSignal.emit();
        break;
      case 'submit':
        this.submitSignal.emit();
        break;
      default:
        this.numpadSignal.emit(btn);
        break;
    }
  }



}
