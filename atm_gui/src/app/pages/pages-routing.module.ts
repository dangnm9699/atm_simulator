import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnotherServiceComponent } from './another-service/another-service.component';
import { CheckAccountBalanceComponent } from './check-amount-money/check-account-balance/check-account-balance.component';
import { ConfirmTransferComponent } from './transfer/confirm-transfer/confirm-transfer.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { TransferComponent } from './transfer/transfer/transfer.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { ConfirmTransactionComponent } from './withdraw/confirm-transaction/confirm-transaction.component';
import { InputMoneyComponent } from './withdraw/input-money/input-money.component';
import { PrintInvoiceComponent } from './withdraw/print-invoice/print-invoice.component';
import { SelectMoneyComponent } from './withdraw/select-money/select-money.component';
import { TransactionFailComponent } from './withdraw/transaction-fail/transaction-fail.component';
import { TransactionResultComponent } from './withdraw/transaction-result/transaction-result.component';
import { InputAmountTransferComponent } from './transfer/input-amount-transfer/input-amount-transfer.component';
import { OldPasswordComponent } from './change-password/old-password/old-password.component';
import { NewPasswordComponent } from './change-password/new-password/new-password.component';
import { AgainPasswordComponent } from './change-password/again-password/again-password.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      {
        path:'home',
        component: CheckAccountBalanceComponent
      },
      
      {
        path:'select-service',
        component: SelectServiceComponent
      },
      {
        path:'check-account-balance',
        component: CheckAccountBalanceComponent
      },
      {
        path:'select-money',
        component: SelectMoneyComponent
      },
      {
        path:'input-money',
        component: InputMoneyComponent
      },
      {
        path:'transaction-fail',
        component: TransactionFailComponent
      },
      {
        path:'confirm-transaction',
        component: ConfirmTransactionComponent
      },
      {
        path:'print-invoice',
        component: PrintInvoiceComponent
      },
      {
        path:'another-service',
        component: AnotherServiceComponent
      },
      {
        path:'transaction-result',
        component: TransactionResultComponent
      },
      {
        path:'transfer',
        component: TransferComponent
      },
      {
        path:'confirm-transfer',
        component: ConfirmTransferComponent
      },
      {
        path:'input-amount-transfer',
        component: InputAmountTransferComponent
      },
      {
        path:'old-password',
        component: OldPasswordComponent
      },
      {
        path:'new-password',
        component: NewPasswordComponent
      },
      {
        path:'again-password',
        component: AgainPasswordComponent
      },
      {
        path:'users',
        component: UsersComponent,
        children:[
          {
            path:'create',
            component: CreateUserComponent
          },
          {
            path:'edit',
            component: EditUserComponent
          },
        ]
      },
      {
        path:'',
        redirectTo:'select-service',
        pathMatch:'full'
      }
    ]
  }];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
