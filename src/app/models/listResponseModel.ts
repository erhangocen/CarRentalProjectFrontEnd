import { BaseResponseModel } from "./baseResponseModel";

export interface ListResponseModel<T> extends BaseResponseModel{
  data: T[];
}