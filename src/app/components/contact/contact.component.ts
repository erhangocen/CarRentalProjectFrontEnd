import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { ContactService } from 'src/app/services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  userId: number = this.authService.userId;
  contactForm: FormGroup;

  constructor(private authService:AuthService, private formBuilder:FormBuilder, private contactService:ContactService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      userId: [this.userId],
      contInfo: ["", Validators.required],
      message: ["", Validators.required]
    })
  }

  send() {
    if (this.contactForm.valid) {
      let contactModel = Object.assign({}, this.contactForm.value);
      this.contactService.add(contactModel).subscribe(response => {
        this.toastrService.success(response.message);
        this.ngOnInit();
      });
    }
    else {
      this.toastrService.error("Form informations is missing")
    }
  }
  

}
