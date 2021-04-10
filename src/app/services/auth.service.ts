import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { UserService } from './user.service';
import { UserForUpdate } from '../models/userForUpdate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: number;
  public loggedUser:User;
  jwt: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private userService: UserService) { this.findUser() }

  url = "https://localhost:44350/api/auth"
  
  register(loginModel:LoginModel) {
    let fullPath = this.url + "/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(fullPath, loginModel);
  }

  login(registerModel:RegisterModel) {
    let fullpath = this.url + "/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(fullpath, registerModel);
  }

  update(user:UserForUpdate) {
    let fullpath = this.url + "/update";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(fullpath, user);
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  findUser() {
    if (this.isAuthenticated()) {
      let decodedToken = this.jwt.decodeToken(this.getToken()?.toString());
      let propUserId = Object.keys(decodedToken).filter((u) =>
        u.endsWith('/nameidentifier')
      )[0];
      this.userId = Number(decodedToken[propUserId])
    }
  }

  getUserId() {
    return this.userId;
  }

  catchUser() {
    this.userService.getUserById(this.userId).subscribe(response => {
      this.loggedUser = response.data;
    })
  }

  getUserName(){
    return this.jwt.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  getUserRoles(){
    if(this.getToken() != null){
      if (!('http://schemas.microsoft.com/ws/2008/06/identity/claims/role' in this.jwt.decodeToken(this.getToken()?.toString()))){
        return "User";
      }
      return this.jwt.decodeToken(this.getToken()?.toString())["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }else {
      return "User";
    }
  }
  
}
