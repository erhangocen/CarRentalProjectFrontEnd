import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { faCar,faHome,faPaperPlane,faCarSide,faCrown,faSignOutAlt,faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ProfilePhoto } from 'src/app/models/profilePhoto';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuss = [
    { menuName: "ALL CARS", menuPath: "/admin/cars/1" },
    { menuName: "ALL RENTALS", menuPath: "/admin/rentals" },
    { menuName: "ALL USERS", menuPath: "/admin/users" },
    { menuName: "ALL COLORS", menuPath: "/admin/colors" },
    { menuName: "ALL BRANDS", menuPath: "/admin/brands" }
  ]

  selectmenu:[];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private userService:UserService, private router:Router, private imageService:ImageService) { }
  
  faCar = faCar;
  faHome = faHome;
  faPaperPlane = faPaperPlane;
  faCarSide = faCarSide;
  faCrown = faCrown;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

  loggedUser: User;
  userId: number;
  userName: string;
  role: string;

  pp: ProfilePhoto;
  basePath = "https://localhost:44350/";
  
  xx: boolean = true;

   async ngOnInit():Promise<void> {
      this.getUserName();
      this.getClaim();
      this.getUserId();
      await this.delay(1000);
      this.getpp();
  }

  firstName() {
    if (this.userName) {
       return this.userName;
    }
    else {
      return "Loading..."
    }
  }

  getUserName() {
    if (this.authService.isAuthenticated()) {
      this.userName = this.authService.getUserName();
    }
  }

  getClaim() {
    if (this.authService.isAuthenticated()) {
      this.role = this.authService.getUserRoles();
      console.log(this.role);
    }
  }

  getUserId() {
    this.userId = this.authService.userId;
  }

  menusClass(menu:any) {
    if (menu == this.selectmenu) {
      return "dropdown-item active"
    }
    return "dropdown-item";
  }

  menuSelect(menu:any) {
    this.selectmenu = menu;
  }
  
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getMainpage() {
    this.router.navigate(["cars"])
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async logOut() {
    this.authService.logOut();
    window.location.reload();
    await this.delay(300);
    this.getMainpage();
  }

  getpp() {
    this.imageService.getUserpp(this.userId).subscribe(respoonse => {
      this.pp = respoonse.data;
    })
  }

}
