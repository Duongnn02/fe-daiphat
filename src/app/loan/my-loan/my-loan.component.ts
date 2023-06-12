import { Component, OnInit } from '@angular/core';
import {LoanService} from "../../service/loan.service";

@Component({
  selector: 'app-my-loan',
  templateUrl: './my-loan.component.html',
  styleUrls: ['./my-loan.component.css']
})
export class MyLoanComponent implements OnInit {
  data: any;
  constructor(private loanSer: LoanService) { }

  ngOnInit(): void {
    this.getInforpay();
  }
  getInforpay() {
    this.loanSer.getInforPay().subscribe(res => {
      this.data = res;
    })
  }

}
