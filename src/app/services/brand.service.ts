import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBrand } from '../models/addBrand';
import { Brand } from '../models/brand';
import { DeleteBrand } from '../models/deleteBrand';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UpdateBrand } from '../models/updateBrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44350/api/brands";

  constructor(private http: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let fullpath = this.apiUrl + "/getall"
    return this.http.get<ListResponseModel<Brand>>(fullpath);
  }

  add(brand:Brand):Observable<SingleResponseModel<AddBrand>> {
    let fullpath = this.apiUrl + "/add"
    return this.http.post<SingleResponseModel<AddBrand>>(fullpath, brand);
  }

  update(brand: Brand):Observable<SingleResponseModel<UpdateBrand>> {
    let fullPath = this.apiUrl + "/update";
    return this.http.post<SingleResponseModel<UpdateBrand>>(fullPath, brand);
  }

  delete(brand:Brand):Observable<SingleResponseModel<DeleteBrand>> {
    let fullPath = this.apiUrl + "/delete";
    return this.http.post<SingleResponseModel<DeleteBrand>>(fullPath, brand);
  }
  
}
