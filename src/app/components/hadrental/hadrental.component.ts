import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-hadrental',
  templateUrl: './hadrental.component.html',
  styleUrls: ['./hadrental.component.css', '.././utilities/border.css']
})
export class HadrentalComponent implements OnInit {

  hadRentals: Rental[] = [];
  dataLoaded = false;

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getHadRentals();
  }

  getHadRentals() {
    this.rentalService.getHadRenteds().subscribe(response => {
      if (response.success) {
        this.hadRentals = response.data;
        this.dataLoaded = true;
      }
    })
  }

}
