import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { NewRental } from 'src/app/models/newRental';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  car: Car;
  carImages: CarImage[];
  baseImagePath = "";
  basePath = "https://localhost:44350/";

  user: User;
  userId: number = this.authService.userId;

  rentDate: Date;
  returnDate: Date;
  amountPaye: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private imageservice:ImageService, private toastrService:ToastrService, private userService: UserService, private authService:AuthService, private router:Router, private rentalService: RentalService, private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async param => {
      if (param["carId"]) {
        await this.delay(500);
        this.getCarDetail(param["carId"]);
        this.getImagesbyCar(param["carId"]);
      }
    })
    this.getUser(this.userId);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getUser(id:number) {
    this.userService.getUserById(id).subscribe(response => {
      if (response.success) {
        this.user = response.data;
      }
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.car = response.data;
    })
  }

  getImagesbyCar(carId:number) {
    this.imageservice.getImagesbyCar(carId).subscribe(image => {
      this.carImages = image.data;
    })
  }

  carouselClass(index:number) {
    if (index === 0) {
      return "carousel-item active"
    }
    else {
      return "carousel-item"
    }
  }

  rentRequest() {
    if (this.authService.isAuthenticated()) {
      if (this.rentDate && this.returnDate) {
        if (this.rentDate < this.returnDate) {

            let newRent: NewRental = {
              carId: this.car.carId,
              customerId: this.user.customerId,
              rentDate: this.rentDate,
              returnDate: this.returnDate
            }
          this.rentalService.checkCarStatus(newRent).subscribe(async response => {
            let rentDate = new Date(this.rentDate);
            let returnDate = new Date(this.returnDate);
            let dateDifference = returnDate.getTime() - rentDate.getTime();
            let numberOfDays = Math.ceil(dateDifference / (1000 * 3600 * 24));
            
            if (numberOfDays > 1) {
              this.amountPaye = numberOfDays * this.car.dailyPrice;
              this.paymentService.setRental(newRent, this.amountPaye, this.car);
              this.toastrService.info("You are being redirected to the payment page...")
              await this.delay(3000);
              this.router.navigate(["/payment"]);
            }
            else {
              this.toastrService.error("you can rent the vehicle for at least one day");
            }
          }, errorResponse => {
            this.toastrService.error(errorResponse.error.message);
            console.log(errorResponse.error.message);
          })
          
          }
          else {
            this.toastrService.error("the rental date must be before the return date")
          }
        }
      else {
        this.toastrService.error("You must choose a rent date and a return date")
    }
    }
    else {
      this.toastrService.error("You must login to continue");
      this.router.navigate(["login"]);
    }
    
  }


}
