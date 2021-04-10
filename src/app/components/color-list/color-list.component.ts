import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { faCoffee, faWrench, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css', '.././utilities/border.css']
})
export class ColorListComponent implements OnInit {

  faCoffee = faCoffee;
  faWrench = faWrench;
  faTrashAlt = faTrashAlt;

  filterText: string;

  colors: Color[];
  dataLoaded = false;
  targetColor: Color;

  colorForm: FormGroup;

  constructor(private colorService:ColorService, private formBuilder:FormBuilder, private toastService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorForm();
  }

  createColorForm() {
    this.colorForm = this.formBuilder.group({
      colorName : ["", Validators.required]
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
        this.dataLoaded = true;
      }
      else {
        console.log(response.message);
      }
    })
  }

  targetThisColor(color:Color) {
    this.targetColor = color;
    console.log(this.targetColor);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  add() {
    if (this.colorForm.valid) {
      let colorModel = Object.assign({}, this.colorForm.value);
      console.log(colorModel);
      this.colorService.add(colorModel).subscribe(response => {
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
    if (this.colorForm.valid) {
      let colorModel = Object.assign(this.colorForm.value, { colorId: this.targetColor.colorId })
      console.log(colorModel);
      this.colorService.update(colorModel).subscribe(response => {
        this.toastService.success(response.message, "Basarili");
        window.location.reload();
      }, errorResponse => {
        console.log(errorResponse);
      })
    }
  }

  delete() {
    let colorModel = Object.assign({ colorId: this.targetColor.colorId });
    console.log(colorModel);
    this.colorService.delete(colorModel).subscribe(response => {
      this.toastService.success(response.message, "Basrili");
      window.location.reload();
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

}
