import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44350/api/brands/getall";

  constructor(private http: HttpClient) { }

  getBrands():Observable<BrandResponseModel> {
    return this.http.get<BrandResponseModel>(this.apiUrl);
  }
  
}
