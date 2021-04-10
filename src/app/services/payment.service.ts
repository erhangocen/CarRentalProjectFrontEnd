import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalComponent } from '../components/rental/rental.component';
import { BaseResponseModel } from '../models/baseResponseModel';
import { Car } from '../models/car';
import { CreditCardModel } from '../models/creditCardModel';
import { ListResponseModel } from '../models/listResponseModel';
import { NewRental } from '../models/newRental';
import { Rental } from '../models/rental';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rental: NewRental;
  amountPaye: number = 0;
  rentingCar: Car;

  apiUrl = "https://localhost:44350/api/CreditCard"
  payUrl = "https://localhost:44350/api/payment"

  constructor(private httpClient:HttpClient, private authServise:AuthService) { }

  setRental(rental:NewRental, amountPaye:number, car:Car) {
    this.amountPaye = amountPaye;
    this.rental = rental;
    this.rentingCar = car;
  }

  add(creditcard:CreditCardModel) {
    let fullpath = this.apiUrl + "/add";
    return this.httpClient.post<BaseResponseModel>(fullpath, creditcard);
  }

  getByCustomerId():Observable<ListResponseModel<CreditCardModel>> {
    let fullpath = this.apiUrl + "/getByCustomer?id=" + this.rental.customerId;
    return this.httpClient.get<ListResponseModel<CreditCardModel>>(fullpath);
  }

  pay(card:CreditCardModel, rental:NewRental) {
    let fullPath = this.payUrl + "/pay";
    let list = [card, rental];
    return this.httpClient.post<BaseResponseModel>(fullPath, list);
  }
  
  getByCustomer(customerId:number):Observable<ListResponseModel<CreditCardModel>> {
    let fullpath = this.apiUrl + "/getByCustomer?id=" + customerId;
    return this.httpClient.get<ListResponseModel<CreditCardModel>>(fullpath);
  }
}
