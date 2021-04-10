import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { NewRental } from '../models/newRental';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44350/api/rentals";

  constructor(private http: HttpClient) { }

  getFullRentals(): Observable<ListResponseModel<Rental>> {
    let fullPath = this.apiUrl + "/getfullrentaldetails";
    return this.http.get<ListResponseModel<Rental>>(fullPath);
  }

  getRentalsByUser(customerId: number):Observable<ListResponseModel<Rental>> {
    let fullPath = this.apiUrl + "/getrentalsbyuser?id=" + customerId;
    return this.http.get<ListResponseModel<Rental>>(fullPath);
  }

  checkCarStatus(rental: NewRental):Observable<BaseResponseModel> {
    let fullPath = this.apiUrl + "/checkcarstatus";
    return this.http.post<BaseResponseModel>(fullPath, rental);
  }

  add(rental: NewRental) {
    let fullPath = this.apiUrl + "/add";
    return this.http.post<BaseResponseModel>(fullPath, rental);
  }
  
}
