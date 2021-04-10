import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGooglePlus = faGooglePlusG;

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toasterService:ToastrService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      passwordAgain: ["", Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      if (registerModel.password === registerModel.passwordAgain) {
        this.authService.register(registerModel).subscribe(response => {
          if (response.success) {
            this.toasterService.success(response.message, "Successful");
            this.router.navigate(["login"]);
          }
        }, responseError => {
          if (responseError.error.ValidationErrors.length > 0) {
          console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toasterService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Dogrulama Hatası")
          }
        }
        })
      }
      else {
        this.toasterService.error("Girdiğiniz Şifreler Uyuşmuyor","Dikkat")
      }
    }
    else {
      this.toasterService.error("Formunuz Eksik", "Dikkat")
    }
  }
  
}
