import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { faCoffee,faWrench,faTrashAlt,faCamera } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { DeleteCar } from 'src/app/models/deleteCar';
import { NumberFormatStyle } from '@angular/common';
import { timer } from 'rxjs';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { BaseCar } from 'src/app/models/baseCar';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';



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
  faCamera = faCamera;

  filterText: string;
  
  selectedFiles: FileList;

  carAddForm: FormGroup;
  carUpdateForm: FormGroup;
  brandAddForm: FormGroup;
  colorAddForm: FormGroup;
  imageAddForm: FormGroup;

  targetCar: Car;

  brands: Brand[];
  colors: Color[];

  modal: boolean = true;
  fileSelected: boolean = false;
  selectedFile: File;

  constructor(private carService: CarService, private formBuilder:FormBuilder, private toastrService:ToastrService, private brandService:BrandService, private colorService:ColorService, private imageService:ImageService) { }

  ngOnInit(): void {
    this.getCars();
    this.getAllbrands();
    this.getAllColors();
    this.createCarAddForm();
    this.createCarUpdateForm();
    this.createImageAddForm();

    console.log(this.targetCar);
    console.log(this.brands);
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      if (response.success) {
        this.cars = response.data;
        this.dataLoaded = true;
      }
    })
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      modelYear: ["", Validators.required],
      description: ["", Validators.required],
      minFindeksPoint: ["", Validators.required]
    });
  }

  createCarUpdateForm() {
      this.carUpdateForm = this.formBuilder.group({
      carId: [],
      brandId: [],
      colorId: [],
      dailyPrice: [],
      modelYear: [],
      description: [],
      minFindeksPoint: []
    });
    
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      Image: ["", Validators.required],
      CarId: [""]
    })
  }


  returnBrand(brand:Brand) {
    return Number(brand.brandId);
  }

  addcar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      console.log(this.carAddForm.value);
      this.carService.add(carModel).subscribe(response => {
        console.log(response);
        this.toastrService.success(response.message, "Basrili");
        window.location.reload();
      }, responseError => {
        if (responseError.error.ValidationErrors.length > 0) {
          console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Dogrulama Hatası")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }
  

  updateCar() {

    if (this.carUpdateForm.valid) {
      let carmodel = Object.assign(this.carUpdateForm.value, { carId: this.targetCar.carId });
      
      console.log(carmodel);
      this.carService.update(carmodel).subscribe(response => {
        console.log(response);
        this.toastrService.info(response.message, "Güncellendi");
        window.location.reload();
      }, responseError => {
        if (responseError.error.ValidationErrors.length > 0) {
          console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Dogrulama Hatası")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik");
    }
  }

  getAllbrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  deleteCar() {
    let deleteCar:Car = Object.assign({carId : this.targetCar.carId});
    console.log(deleteCar); 
    this.carService.delete(deleteCar).subscribe(response => {
      console.log(response);
      window.location.reload();
      this.toastrService.info(response.message);
    }, responseError => {
      console.log(responseError);
      this.toastrService.error(responseError);
    }) 
  }

  targetThisCar(car: Car) {
    this.targetCar = car;
    console.log(this.targetCar);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  
  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
    }
  }

  upload(file: File): void {
    if (!file) return;

    this.imageService.addCarImage(this.targetCar.carId, file).subscribe(response => {
      this.toastrService.success(file.name, 'Uploaded car image successfully!');
    });
  }

}
