import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NumpadComponent } from './components/numpad/numpad.component';
import { TranslateModule } from '@ngx-translate/core';
import { BlinkEllipsisComponent } from './components/blink-ellipsis/blink-ellipsis.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NumpadComponent,
    BlinkEllipsisComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    TranslateModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NumpadComponent,
    BlinkEllipsisComponent
  ]
})
export class SharedModule { }
