import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { InputMoneyComponent } from './withdraw/input-money/input-money.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { SelectMoneyComponent } from './withdraw/select-money/select-money.component';
import { TransactionResultComponent } from './withdraw/transaction-result/transaction-result.component';


@NgModule({
  declarations: [PagesComponent, HomeComponent, InputMoneyComponent, SelectLanguageComponent, SelectServiceComponent, SelectMoneyComponent, TransactionResultComponent],
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
