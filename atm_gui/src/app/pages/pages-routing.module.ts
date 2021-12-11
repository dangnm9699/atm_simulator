import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { InputMoneyComponent } from './withdraw/input-money/input-money.component';
import { SelectMoneyComponent } from './withdraw/select-money/select-money.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'select-service',
        component: SelectServiceComponent
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
        redirectTo:'home',
        pathMatch:'full'
      }
    ]
  }];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
