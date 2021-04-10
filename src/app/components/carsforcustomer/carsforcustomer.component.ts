import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActionSequence } from 'selenium-webdriver';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { FilterModel } from 'src/app/models/filterModel';

@Component({
  selector: 'app-carsforcustomer',
  templateUrl: './carsforcustomer.component.html',
  styleUrls: ['./carsforcustomer.component.css']
})
export class CarsforcustomerComponent implements OnInit {
 
  cars: Car[];
  brands: Brand[];
  colors: Color[];

  dangerMessage: boolean = false;

  filterColor: number;
  filterBrand: number;

  filterForm: FormGroup;

  images: CarImage[];
  dataLoaded = false;
  basePath = "https://localhost:44350/";
  filterText: string;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private toastrService:ToastrService, private colorService:ColorService, private brandService:BrandService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getbyBrand(params["brandId"]);
      }
      else if (params["colorId"]) {
        this.getbyColor(params["colorId"]);
      }
      else {
        this.getAllCars();
      }
    })

    this.getAllBrands();
    this.getAllColors();
    this.createFilterForm();
  }

  getBothOfFilter(filterBrand:number, filterColor:number) {
    filterBrand = this.filterBrand;
    filterColor = this.filterColor;

    if (filterBrand == undefined) {
      this.carService.getbyColor(filterColor).subscribe(response => {
        this.cars = response.data;
      })
    }
    else if (filterColor == undefined) {
      this.carService.getbyBrand(filterBrand).subscribe(response => {
        this.cars = response.data;
      })
    }
    else {
      this.carService.getByBrandAndColorId(filterBrand, filterColor).subscribe(response => {
        this.cars = response.data;
    })  
    }
    console.log(this.cars.length)
    this.dangerMessage = true;
  }

  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      colorId: [""],
      brandId: [""]
    })
  }

  selectColor(colorId:number) {
    if (this.filterColor == colorId) {
      return true
    }
    else {
      return false;
    }
  }

  selectBrand(brandId: number) {
    if (this.filterBrand == brandId) {
      return true;
    }
    else {
      return false;
    }
  }

  getAllCars() {
    this.carService.getCars().subscribe(cars => {
      if (cars.success) {
        this.cars = cars.data;
        this.dataLoaded = true;
      }
    })
  }

  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
      }
    })
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
      }
    })
  }

  getbyBrand(brandId: number) {
    this.carService.getbyBrand(brandId).subscribe(cars => {
      if (cars.success) {
        this.cars = cars.data;
        this.dataLoaded = true;
      }
    })
  }

  getbyColor(colorId: number) {
    this.carService.getbyColor(colorId).subscribe(cars => {
      if (cars.success) {
        this.cars = cars.data;
        this.dataLoaded = true;
      }
    })
  }

  fastlyRent(car: Car) {
    if (localStorage.getItem("token")) {
      this.toastrService.info("You are being redirected to the payment page!")
    }
  }

  getCarImage(car: Car) {
    if (car.imagePath) {
      return this.basePath + car.imagePath
    }
    else {
      return this.basePath + 'Images/CarImages/default.jpg'
    }
  }

  refreshPage() {
    window.location.reload();
  }
  
}
