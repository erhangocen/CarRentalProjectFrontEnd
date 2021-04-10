import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/baseResponseModel';
import { Contact } from '../models/contact';
import { Message } from '../models/message';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = "https://localhost:44350/api/contacts";

  constructor(private httpClient: HttpClient) { }
  
  getAllMessages():Observable<ListResponseModel<Message>> {
    let fullPath = this.apiUrl + "/getcontactdetails";
    return this.httpClient.get<ListResponseModel<Message>>(fullPath);
  }

  add(contact:Contact) {
    let fullPath = this.apiUrl + "/add";
    return this.httpClient.post<BaseResponseModel>(fullPath, contact);
  }

  delete(message: Message) {
    let fullPath = this.apiUrl + "/delete";
    return this.httpClient.post<BaseResponseModel>(fullPath, message)
  }
}
