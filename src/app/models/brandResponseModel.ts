import { BaseResponseModel } from "./baseResponseModel";
import { Brand } from "./brand";

export interface BrandResponseModel extends BaseResponseModel{
  data: Brand[];
}