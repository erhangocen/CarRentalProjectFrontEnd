import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/baseResponseModel';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ProfilePhoto } from '../models/profilePhoto';
import { RemovePp } from '../models/removePp';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  imgUrl = "https://localhost:44350/api/carimages"
  ppUrl = "https://localhost:44350/api/profilephotos"

  getImagesbyCar(carId: number): Observable<ListResponseModel<CarImage>> {
    let fullPath = this.imgUrl + "/getbycarid?id=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(fullPath);
  }

  addCarImage(carId:number, file:File):Observable<BaseResponseModel> {
    let fullpath = this.imgUrl + "/add";

    const formData: FormData = new FormData();
    formData.append('CarId', carId.toString());
    formData.append('Image', file);

    return this.httpClient.post<BaseResponseModel>(fullpath, formData, {reportProgress:true, responseType:"json"});
  }

  addProfilePhoto(userId:number, file:File):Observable<BaseResponseModel> {
    let fullpath = this.ppUrl + "/update";

    const formData: FormData = new FormData();
    formData.append('UserId', userId.toString());
    formData.append('Image', file);

    return this.httpClient.post<BaseResponseModel>(fullpath, formData, {reportProgress:true, responseType:"json"});
  }

  getUserpp(userId:number):Observable<SingleResponseModel<ProfilePhoto>> {
    let fullPath = this.ppUrl + "/getbyuserid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<ProfilePhoto>>(fullPath);
  }

  deletePp(imageId:number) {
    let fullPath = this.ppUrl + "/delete";
    const formData: FormData = new FormData();
    formData.append('ImageId', imageId.toString());

    return this.httpClient.post<BaseResponseModel>(fullPath, formData);
  }
}
