import { BaseResponseModel } from "./baseResponseModel";
import { User } from "./user";

export interface UserResponseModel extends BaseResponseModel{
  data: User[]
}