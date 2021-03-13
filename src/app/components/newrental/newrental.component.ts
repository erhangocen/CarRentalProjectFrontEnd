import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-newrental',
  templateUrl: './newrental.component.html',
  styleUrls: ['./newrental.component.css', '.././utilities/border.css']
})
export class NewrentalComponent implements OnInit {

  newRentals: Rental[] = [];
  dataLoaded = false;

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getNewRentals();
  }

  getNewRentals() {
    this.rentalService.getRenteds().subscribe(response => {
      if (response.success) {
        this.newRentals = response.data;
        this.dataLoaded = true;
      }
    })
  }

}
