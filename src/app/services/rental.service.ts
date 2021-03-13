import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  fullRentalUrl = "https://localhost:44350/api/rentals/getfullrentaldetails";
  hadRentedUrl = "https://localhost:44350/api/rentals/getrentedetail";
  rentedUrl = "https://localhost:44350/api/rentals/getrentaldetail";

  constructor(private http: HttpClient) { }

  getFullRentals():Observable<RentalResponseModel> {
    return this.http.get<RentalResponseModel>(this.fullRentalUrl);
  }

  getHadRenteds(): Observable<RentalResponseModel> {
    return this.http.get<RentalResponseModel>(this.hadRentedUrl);
  }

  getRenteds(): Observable<RentalResponseModel> {
    return this.http.get<RentalResponseModel>(this.rentedUrl);
  }

}
