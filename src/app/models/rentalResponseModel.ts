import { BaseResponseModel } from "./baseResponseModel";
import { Rental } from "./rental";

export interface RentalResponseModel extends BaseResponseModel{
  data: Rental[]
}