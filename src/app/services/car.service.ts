import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel} from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { BaseResponseModel } from '../models/baseResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AddCar } from '../models/addCar';
import { UpdateCar } from '../models/updateCar';
import { DeleteCar } from '../models/deleteCar';
import { BaseCar } from '../models/baseCar';
import { AddCarImage } from '../models/addCarImage';
import { AddCarImagee } from '../models/addCarImagee';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl = "https://localhost:44350/api/cars";
  imageUrl = "https://localhost:44350/api/carimages";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let fullpath = this.baseUrl + "/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(fullpath);
  }

  getbyBrand(brandId:number): Observable<ListResponseModel<Car>> {
    let fullpath = this.baseUrl + "/getdetailsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(fullpath);
  }

  getbyColor(colorId:number): Observable<ListResponseModel<Car>> {
    let fullpath = this.baseUrl + "/getdetailsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(fullpath);
  }

  getImages():Observable<ListResponseModel<CarImage>> {
    let fullpath = this.imageUrl + "/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(fullpath);
  }

  getCarImages(id: number):Observable<ListResponseModel<CarImage>> {
    let fullpath = this.imageUrl + "/getbycarid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarImage>>(fullpath);
  }

  getCarDetail(carId:number):Observable<SingleResponseModel<Car>> {
    let fullpath = this.baseUrl + "/getbycarid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(fullpath);
  }

  add(car:Car):Observable<SingleResponseModel<AddCar>>{
    let fullPath = this.baseUrl + "/add";
    return this.httpClient.post<SingleResponseModel<AddCar>>(fullPath, car);
  }

  update(car:Car):Observable<SingleResponseModel<UpdateCar>> {
    let fullPath = this.baseUrl + "/update"
    return this.httpClient.post<SingleResponseModel<UpdateCar>>(fullPath, car);
  }

  delete(car:Car):Observable<SingleResponseModel<DeleteCar>> {
    let fullpath = "https://localhost:44350/api/cars/delete";
    return this.httpClient.post<SingleResponseModel<DeleteCar>>(fullpath, car);
  }

  getById(carId: number):Observable<SingleResponseModel<BaseCar>> {
    let fullpath = this.baseUrl + "/getById?id=" + carId;
    return this.httpClient.get<SingleResponseModel<BaseCar>>(fullpath);
  }

  getByBrandAndColorId(brandId:number, colorId:number):Observable<ListResponseModel<Car>> {
    let fullpah = this.baseUrl + "/getfilterdetails?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(fullpah);
  }

}
