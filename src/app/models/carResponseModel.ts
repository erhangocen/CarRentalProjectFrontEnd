import { BaseResponseModel } from "./baseResponseModel";
import { Car } from "./car";

export interface CarResponseModel extends BaseResponseModel{
  data : Car[]
}