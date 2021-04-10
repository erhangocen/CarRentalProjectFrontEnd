import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import { ProfilePhoto } from 'src/app/models/profilePhoto';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { CreditCardModel } from 'src/app/models/creditCardModel';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  faPen = faPen;

  userId:number;
  user: User;
  rentals: Rental[];
  pp: ProfilePhoto;
  cards:CreditCardModel[];

  basePath = "https://localhost:44350/";

  updateForm: FormGroup;

  isAnyRentall: boolean = false;  
  selectFile: FileList;

  constructor(private userService: UserService, private authService: AuthService, private rentalservice:RentalService, private formBuilder:FormBuilder, private toastrService:ToastrService, private imageService:ImageService, private paymentService:PaymentService) { }

  async ngOnInit(): Promise<void> {
    this.getUserId();
    this.createUpdateForm();
    await this.delay(500);
    this.getUser(this.userId);
    await this.delay(1000);
    this.getRentals();
    await this.delay(500);
    this.getAllCards();
    this.isAnyRental();
    this.getPp(this.userId);
    
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

  getAllCards() {
    this.paymentService.getByCustomer(this.user.customerId).subscribe(response => {
      this.cards = response.data;
    })
  }

  getUserId() {
    this.userId = this.authService.userId;
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  getRentals() {
    this.rentalservice.getRentalsByUser(this.user.customerId).subscribe(response => {
      this.rentals = response.data;
    })
  }

  isAnyRental() {
    let length = this.rentals.length;
    if (length == 0) {
      this.isAnyRentall = true
    }
    else {
      this.isAnyRentall = false
    }
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      userId: [this.userId],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      companyName: [""]
    })
  }

  update() {
    if (this.updateForm.valid) {
      let updateModel = Object.assign(this.updateForm.value, {findeksPoint: this.user.findeksPoint});
    console.log(updateModel);
    this.authService.update(updateModel).subscribe(response => {
      this.toastrService.success("Your information has been updated successfully","Successful");
      localStorage.setItem("token", response.data.token);
      this.authService.getUserName();
      window.location.reload();
    }, errorResponse => {
      console.log(errorResponse);
    })
    }
    if (this.updateForm.value.companyName) {
      let customerModel = Object.assign({ customerId: this.user.customerId, userId:this.userId, companyName: this.updateForm.value.companyName,  findeksPoint:this.user.findeksPoint });
      this.ngOnInit();
      this.userService.updateCustomer(customerModel).subscribe(response => {
        this.toastrService.success(response.message);
      }, errorResponse => {
        console.log(errorResponse);
      })
    }
  }

  selectFiles(event: any): void {
    this.selectFile = event.target.files;
  }

  
  uploadFile(): void {
    if (this.selectFile) {
      for (let i = 0; i < this.selectFiles.length; i++) {
        this.upload(this.selectFile[i]);
      }
    }
  }

  upload(file: File): void {
    if (!file) return;

    this.imageService.addProfilePhoto(this.userId, file).subscribe(response => {
      this.toastrService.success(file.name, 'Uploaded car image successfully!');
      window.location.reload();
    });
  
  }

  convertNull() {
    this.selectFile = Object.assign({});
  }

  con() {
    console.log("calisiyorum")
  }

  getPp(userId:number) {
    this.imageService.getUserpp(userId).subscribe(response => {
      this.pp = response.data;
    })
  }

  removePp() {
    if (this.pp.userId != 0) {
      this.imageService.deletePp(this.pp.id).subscribe(response => {
        this.toastrService.warning(response.message)
      }, errorResponse => {
        console.log(errorResponse);
      });
      window.location.reload();
    }
    else {
      this.toastrService.error("PP is undefined");
    }
  }

}
