import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { NewRental } from 'src/app/models/newRental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { CreditCardModel } from 'src/app/models/creditCardModel';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  car: Car = this.paymentService.rentingCar;
  rentingData: NewRental = this.paymentService.rental;
  amountPaye: number = this.paymentService.amountPaye;

  cardAddForm: FormGroup;

  cards: CreditCardModel[];
  targetCard: CreditCardModel;

  user: User;

  constructor(private paymentService:PaymentService, private rentalService:RentalService, private formBuilder:FormBuilder, private toastrSerice:ToastrService, private userService:UserService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createCardAddForm();
    console.log(this.rentingData.customerId);
    this.getAllCards();
    this.getUser(this.authService.userId);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  createCardAddForm() {
    this.cardAddForm = this.formBuilder.group({
      customerId: [this.rentingData.customerId],
      cardNumber: ["", Validators.required],
      cardHolder: ["", Validators.required],
      expMonth: ["", Validators.required],
      expYear: ["", Validators.required],
      cvc: ["", Validators.required]
    })
  }

  addCard() {
    if (this.cardAddForm.valid) {
      let cardModel: CreditCardModel = Object.assign({},this.cardAddForm.value);
      console.log(cardModel);
      this.paymentService.add(cardModel).subscribe(response => {
        this.pay();
      }, responseError => {
        this.toastrSerice.error(responseError.error.Message);
        console.log(responseError);
      })
    }
    else {
      this.toastrSerice.error("Form eksik")
    }
  }

  getAllCards() {
    this.paymentService.getByCustomerId().subscribe(response => {
      this.cards = response.data;
    })
  }


  pay() {
    if (this.targetCard) {
      if (this.user.findeksPoint > this.car.minFindeksPoint) {
        this.rentalService.add(this.rentingData).subscribe(response => {
          this.toastrSerice.success(response.message, "Succesfully Paying");
          this.router.navigate(["/successpayment"]);
        }, async errorResponse => {
          this.toastrSerice.error(errorResponse.error.message);
          await this.delay(2000);
          this.router.navigate(["/cars"]);
        })
      }
      else {
        this.toastrSerice.error("Your Findex Point is not enough")
      }
    }
    else {
      this.toastrSerice.warning("Which One!")
    }
  }

  async payWithNewCard() {
    await this.delay(1000);
    if (this.cardAddForm.value.cardNumber.length == 16) {
      if (this.cardAddForm.value.expMonth <= 12) {
        if (this.cardAddForm.value.expYear > 21) {
          if (this.cardAddForm.value.cvc.length > 2 && this.cardAddForm.value.cvc.length < 5) {
            this.pay();
          }
          else {
            this.toastrSerice.error("CVC must be 3 or 4 digits")
          }
        }
        else {
          this.toastrSerice.error("This card has expired")
        }
      }
      else {
        this.toastrSerice.error("There are 12 months in a year")
      }
    }
    else {
      this.toastrSerice.error("Card Number consist of 16 characters");
    }
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  targetThisCard(card:CreditCardModel) {
    this.targetCard = card;
  }

  targetNewCard() {
    if (this.cardAddForm.valid) {
      let cardModel = Object.assign({}, this.cardAddForm.value);
      this.targetCard = cardModel;
    }
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
}
