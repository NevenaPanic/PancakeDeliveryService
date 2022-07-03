import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './access/login/login.component';
import { UserService } from './shared/services/user.service';
import { RegisterComponent } from './access/register/register.component';
import { UploadPictureComponent } from './uploadPicture/uploadPicture.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductdComponent } from './dashboardElemnts/admin/addProduct/addProduct.component';
import { VerifyComponent } from './dashboardElemnts/admin/verify/verify.component';
import { UserVerifyComponent } from './dashboardElemnts/admin/verify/userVerify/userVerify.component';
import { NewCurrentOrderComponent } from './dashboardElemnts/customer/newCurrentOrder/newCurrentOrder.component';

@NgModule({
  declarations: [
    AppComponent,
    // dodajes sve komponente ovde
    LoginComponent,
    RegisterComponent,
    UploadPictureComponent,
    HomeComponent,
    DashboardComponent,
    AddProductdComponent,
    VerifyComponent,
    UserVerifyComponent,
    NewCurrentOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    // ovde dodajes sve servise koje napravis
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
