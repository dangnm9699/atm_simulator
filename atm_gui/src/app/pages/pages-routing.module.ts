import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
