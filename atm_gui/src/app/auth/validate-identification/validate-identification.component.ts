import { Component, OnInit } from '@angular/core';
import { Subject, interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-validate-identification',
  templateUrl: './validate-identification.component.html',
  styleUrls: ['./validate-identification.component.scss']
})
export class ValidateIdentificationComponent implements OnInit {

  file: File = null;
  dateTime: String;
  private destroy$: Subject<void> = new Subject<void>();
  constructor() { }

  ngOnInit(): void {
    const sub = timer(0,1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dateTime = new Date(Date.now()).toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    })
  }


  onSelect(event) {
    this.file = event.addedFiles[0];
    console.log(this.file, this.file.name, this.file.type);
    
  }

  onRemove(event) {
    console.log(event);
    // this.files.splice(this.files.indexOf(event), 1);
    this.file = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
