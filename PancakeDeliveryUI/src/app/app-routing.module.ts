import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './access/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductdComponent } from './dashboardElemnts/admin/addProduct/addProduct.component';
import { VerifyComponent } from './dashboardElemnts/admin/verify/verify.component';
import { NewCurrentOrderComponent } from './dashboardElemnts/customer/newCurrentOrder/newCurrentOrder.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // all users
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},

  // for logged in users
  { path: 'dashboard', component: DashboardComponent},

  // customer
  { path: 'newCurrentOrder', component: NewCurrentOrderComponent},

  // admin
  { path: 'addProduct', component: AddProductdComponent},
  { path: 'verify', component: VerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
