import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PaymentService } from '../services/payment.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

  constructor(private paymetService:PaymentService, private toastrService:ToastrService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.paymetService.amountPaye != 0) {
      return true;
    }
    else {
      this.toastrService.error("You must first choose a car and a date ");
      this.router.navigate(["/cars"]);
      return false;
    }
    
  }
  
}
