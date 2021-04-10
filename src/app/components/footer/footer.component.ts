import { Component, OnInit } from '@angular/core';
import { faCar,faHandHoldingUsd,faShieldAlt,faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faCar = faCar
  faHandHoldingUsd = faHandHoldingUsd
  faShieldAlt = faShieldAlt;
  faBolt = faBolt;

  constructor() { }

  ngOnInit(): void {
  }

  

}
