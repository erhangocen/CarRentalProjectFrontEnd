import { Component, OnInit } from '@angular/core';
import { faCoffee, faWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css', '.././utilities/border.css']
})
export class BrandListComponent implements OnInit {

  faCoffee = faCoffee;
  faWrench = faWrench;
  faTrashAlt = faTrashAlt;
  filterText: string;

  brands: Brand[];
  dataLoaded = false;
  targetBrand: Brand;

  brandForm: FormGroup;

  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandForm();
  }

  createBrandForm() {
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required]
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
        this.dataLoaded = true;
      }
      else {
        console.log(response.message);
      }
    })
  }

  targetThisBrand(brand:Brand) {
    this.targetBrand = brand;
    console.log(this.targetBrand);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  add() {
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value);
      console.log(brandModel);
      this.brandService.add(brandModel).subscribe(response => {
        this.toastService.success(response.message, "Basarili");
        window.location.reload();
      }, errorResponse => {
        console.log(errorResponse);
      })
    }
    else {
      this.toastService.error("Girilmemiş Bilgiler Var", "Dikkat")
    }
  }

  update() {
    if (this.brandForm.valid) {
      let brandModel = Object.assign(this.brandForm.value, { brandId: this.targetBrand.brandId })
      console.log(brandModel);
      this.brandService.update(brandModel).subscribe(response => {
        this.toastService.success(response.message, "Basarili");
        window.location.reload();
      }, errorResponse => {
        console.log(errorResponse);
      })
    }
  }

  delete() {
    let brandModel = Object.assign({ brandId: this.targetBrand.brandId });
    console.log(brandModel);
    this.brandService.delete(brandModel).subscribe(response => {
      this.toastService.success(response.message, "Basrili");
      window.location.reload();
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

}
