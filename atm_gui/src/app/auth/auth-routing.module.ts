import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { SelectLanguageComponent } from '../pages/select-language/select-language.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ValidateIdentificationComponent } from './validate-identification/validate-identification.component';
import { ValidatePinComponent } from './validate-pin/validate-pin.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children:[
      {
        canActivate:[AuthGuard],
        path:'login',
        component:ValidateIdentificationComponent
      },
      {
        canActivate:[AuthGuard],
        path:'select-language',
        component: SelectLanguageComponent
      },
      {
        canActivate:[AuthGuard],
        path:'pin',
        component:ValidatePinComponent
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
