import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './components/user/user.component';
import { HadrentalComponent } from './components/hadrental/hadrental.component';
import { NewrentalComponent } from './components/newrental/newrental.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './components/menu/menu.component';
import { GeneralitemsComponent } from './components/generalitems/generalitems.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    NavbarComponent,
    ColorComponent,
    RentalComponent,
    UserComponent,
    HadrentalComponent,
    NewrentalComponent,
    LoadingComponent,
    MenuComponent,
    GeneralitemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
