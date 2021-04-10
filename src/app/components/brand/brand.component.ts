import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css',]
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  dataLoaded = false;
  selectBrand: Brand;
  visibly: boolean = true;

  constructor(private brandService: BrandService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getBrands();

  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
        this.dataLoaded = true;
      }
    })
  }
 
  selectbrand(brand: Brand) {
    this.selectBrand = brand;
  }

  selectsClass(brand: Brand) {
    
    if(this.selectBrand != brand) {
      return "list-group-item list-group-item-action bg-dark text-light list-hover"
    }
    else {
      return "list-group-item bg-success text-light"
    }
    
  }

}
