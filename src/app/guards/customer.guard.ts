import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private authService: AuthService, private toastrService: ToastrService, private router: Router)
  { this.getClaim(); }

  role: string;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      if (this.role == "Customer") {
        return true;
      }
      else {
        this.router.navigate(["cars"]);
        this.toastrService.error("You aren't authorized to do so");
        return false;
      }
    }
    else {
      this.router.navigate(["login"]);
      this.toastrService.error("You must login to continue");
      return false;
    }
  }

  getClaim() {
    this.role = this.authService.getUserRoles();
  }

}
