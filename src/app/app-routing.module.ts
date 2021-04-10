import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsforcustomerComponent } from './components/carsforcustomer/carsforcustomer.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorComponent } from './components/color/color.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { SuccespaymentComponent } from './components/succespayment/succespayment.component';
import { UserComponent } from './components/user/user.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';
import { EditororadminGuard } from './guards/editororadmin.guard';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';
import { PaymentGuard } from './guards/payment.guard';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'cars', component: CarsforcustomerComponent },
  { path: 'cars/brands/:brandId', component: CarsforcustomerComponent},
  { path: 'cars/colors/:colorId', component: CarsforcustomerComponent },
  { path: 'cars/details/:carId', component: CardetailComponent},
  { path: 'cars/colors/:colorId/cars/details/:carId', component: CardetailComponent},
  { path: 'cars/brands/:brandId/cars/details/:carId', component: CardetailComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarsforcustomerComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [CustomerGuard, PaymentGuard] },
  { path: 'profile', component: UserdetailComponent, canActivate: [CustomerGuard]},
  { path: 'contact', component: ContactComponent, canActivate:[CustomerGuard]},

  { path: 'login', component: LoginComponent , canActivate:[LogoutGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LogoutGuard] },
  
  
  { path: 'admin', component: CarComponent , canActivate:[EditororadminGuard]},
  { path: 'admin/cars', component: CarComponent , canActivate:[EditororadminGuard]},
  { path: 'admin/cars/:carId', component: CarComponent , canActivate:[EditororadminGuard]},
  { path: 'admin/colors', component: ColorListComponent , canActivate:[EditororadminGuard]},
  { path: 'admin/rentals', component: RentalComponent , canActivate:[EditororadminGuard]},
  { path: 'admin/users', component: UserComponent , canActivate:[EditororadminGuard]},
  { path: 'admin/brands', component: BrandListComponent, canActivate: [EditororadminGuard] },
  { path: 'admin/contact', component: AdminContactComponent, canActivate: [AdminGuard] },
  
  { path: "successpayment", component: SuccespaymentComponent },
  
  { path:"**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
