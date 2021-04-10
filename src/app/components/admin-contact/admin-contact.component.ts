import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/contact';
import { Message } from 'src/app/models/message';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {

  contacts: Message[];
  basePath: string = "https://localhost:44350/";

  constructor(private contactService:ContactService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllContacts();
    console.log(this.contacts);
  }

  getAllContacts() {
    this.contactService.getAllMessages().subscribe(response => {
      this.contacts = response.data;
    })
  }

  getpp(contact:Message) {
    if (contact.imagePath) {
      return this.basePath + contact.imagePath
    }
    else {
      return this.basePath + 'Images/ProfilePhotos/default.jpg'
    }
  }

  removeThisMessage(message: Message) {
    this.contactService.delete(message).subscribe(response => {
      this.toastrService.error(response.message);
      this.ngOnInit();
    })
  }

}
