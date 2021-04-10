import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '.././utilities/border.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  dataLoaded = false;

  filterText: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      if (response.success) {
        this.users = response.data;
        this.dataLoaded = true;
      }
    })
  }

}
