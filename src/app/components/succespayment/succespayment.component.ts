import { Component, OnInit } from '@angular/core';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-succespayment',
  templateUrl: './succespayment.component.html',
  styleUrls: ['./succespayment.component.css']
})
export class SuccespaymentComponent implements OnInit {

  faCheck = faCheck;

  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.paymentService.amountPaye = 0;
  }

}
