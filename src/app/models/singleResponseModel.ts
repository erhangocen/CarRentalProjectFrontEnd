import { BaseResponseModel } from "./baseResponseModel";

export interface SingleResponseModel<T> extends BaseResponseModel{
  data: T;
}