import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  selectColor: Color;
  dataLoaded = false;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
        this.dataLoaded = true;
      }
    })
  }

  selectcolor(color:Color) {
    this.selectColor = color;
  }

  selectsClass(color:Color) {
    if(this.selectColor != color) {
      return "list-group-item list-group-item-action bg-dark text-light list-hover"
    }
    else {
      return "list-group-item bg-success text-light"
    }
  }

}
