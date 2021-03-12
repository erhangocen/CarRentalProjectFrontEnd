import { BaseResponseModel } from "./baseResponseModel";
import { Color } from "./color";

export interface ColorResponseModel extends BaseResponseModel{
  data: Color[]
}