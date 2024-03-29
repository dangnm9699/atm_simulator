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
import { PendingComponent } from './components/pending/pending.component';
import { NotificationScreenComponent } from './components/notification-screen/notification-screen.component';
import { EnterPinComponent } from './components/enter-pin/enter-pin.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NumpadComponent,
    PendingComponent,
    BlinkEllipsisComponent,
    NotificationScreenComponent,
    EnterPinComponent
  ],
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
    PendingComponent,
    BlinkEllipsisComponent,
    NotificationScreenComponent,
    EnterPinComponent
  ]
})
export class SharedModule { }
