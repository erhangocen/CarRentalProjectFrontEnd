import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44350/api/colors/getall";

  constructor(private http: HttpClient) { }

  getColors():Observable<ColorResponseModel> {
    return this.http.get<ColorResponseModel>(this.apiUrl);
  }
}
