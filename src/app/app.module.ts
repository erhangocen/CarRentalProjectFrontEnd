import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './components/user/user.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CarsforcustomerComponent } from './components/carsforcustomer/carsforcustomer.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';

import { FilterpipePipe } from './pipes/filterpipe.pipe'
import { ToastrModule } from "ngx-toastr"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorListComponent } from './components/color-list/color-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { FiltercolorPipe } from './pipes/filtercolor.pipe';
import { FilterrentalPipe } from './pipes/filterrental.pipe';
import { FilterbrandPipe } from './pipes/filterbrand.pipe';
import { FilteruserPipe } from './pipes/filteruser.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SuccespaymentComponent } from './components/succespayment/succespayment.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    NavbarComponent,
    ColorComponent,
    RentalComponent,
    UserComponent,
    LoadingComponent,
    CarsforcustomerComponent,
    CardetailComponent,
    FilterpipePipe,
    ColorListComponent,
    BrandListComponent,
    FiltercolorPipe,
    FilterrentalPipe,
    FilterbrandPipe,
    FilteruserPipe,
    LoginComponent,
    RegisterComponent,
    UserdetailComponent,
    PaymentComponent,
    FooterComponent,
    MainpageComponent,
    SuccespaymentComponent,
    ContactComponent,
    AdminContactComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass : "toast-bottom-right"
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
