import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGooglePlus = faGooglePlusG;

  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(async response => {
        this.toastrService.success("You have successfully log in", "Success");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/cars";
      }, errorResponse => {
        console.log(errorResponse);
        this.toastrService.error(errorResponse.error)
      })
    }
  }

}
