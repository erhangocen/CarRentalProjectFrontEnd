import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddColor } from '../models/addColor';
import { Color } from '../models/color';
import { DeleteColor } from '../models/deleteColor';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UpdateColor } from '../models/updateColor';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44350/api/colors";

  constructor(private http: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let fullpath = this.apiUrl + "/getall"
    return this.http.get<ListResponseModel<Color>>(fullpath);
  }

  add(color:Color):Observable<SingleResponseModel<AddColor>> {
    let fullpath = this.apiUrl + "/add";
    return this.http.post<SingleResponseModel<AddColor>>(fullpath, color)
  }

  update(color:Color):Observable<SingleResponseModel<UpdateColor>> {
    let fullpath = this.apiUrl + "/update";
    return this.http.post<SingleResponseModel<UpdateColor>>(fullpath, color);
  }

  delete(color:Color):Observable<SingleResponseModel<DeleteColor>> {
    let fullpath = this.apiUrl + "/delete";
    return this.http.post<SingleResponseModel<DeleteColor>>(fullpath, color);
  }
}
