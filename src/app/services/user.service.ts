import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseModel } from '../models/userResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44350/api/users/getuserdetails";

  constructor(private http: HttpClient) { }

  getUsers():Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>(this.apiUrl);
  }

}
