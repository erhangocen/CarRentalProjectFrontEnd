import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  imagePath: string = "https://localhost:44350//Images/CarImages/404.png";

  constructor() { }

  ngOnInit(): void {
  }

}
