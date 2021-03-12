import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { faCoffee,faWrench,faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css', '.././utilities/border.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  dataLoaded = false;
  faCoffee = faCoffee;
  faWrench = faWrench;
  faTrashAlt = faTrashAlt;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
    //console.log(this.Cars);  
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      if (response.success) {
        this.cars = response.data;
        this.dataLoaded = true;
      }
    })
  }

}
