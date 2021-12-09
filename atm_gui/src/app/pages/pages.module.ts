import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PendingComponent } from './pending/pending.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [PagesComponent, HomeComponent, PendingComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatButtonModule,
    SharedModule,
    TranslateModule
  ],
  entryComponents:[PagesComponent]
})
export class PagesModule { }
