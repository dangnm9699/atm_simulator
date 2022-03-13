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
import { ConfirmTransactionComponent } from './withdraw/confirm-transaction/confirm-transaction.component';
import { AnotherServiceComponent } from './another-service/another-service.component';
import { PrintInvoiceComponent } from './withdraw/print-invoice/print-invoice.component';
import { CheckAccountBalanceComponent } from './check-amount-money/check-account-balance/check-account-balance.component';
import { TransactionFailComponent } from './withdraw/transaction-fail/transaction-fail.component';
import { TransferComponent } from './transfer/transfer/transfer.component';
import { ConfirmTransferComponent } from './transfer/confirm-transfer/confirm-transfer.component';
import { InputAmountTransferComponent } from './transfer/input-amount-transfer/input-amount-transfer.component';
import { OldPasswordComponent } from './change-password/old-password/old-password.component';
import { NewPasswordComponent } from './change-password/new-password/new-password.component';
import { AgainPasswordComponent } from './change-password/again-password/again-password.component';
import { ShowReceiptComponent } from './show-receipt/show-receipt.component';


@NgModule({
  declarations: [PagesComponent, HomeComponent, InputMoneyComponent, SelectLanguageComponent, SelectServiceComponent, SelectMoneyComponent, TransactionResultComponent, ConfirmTransactionComponent, AnotherServiceComponent, PrintInvoiceComponent, CheckAccountBalanceComponent, TransactionFailComponent, TransferComponent, ConfirmTransferComponent, InputAmountTransferComponent, OldPasswordComponent, NewPasswordComponent, AgainPasswordComponent, ShowReceiptComponent],
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
