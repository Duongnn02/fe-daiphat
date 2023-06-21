import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {LoanService} from "../../service/loan.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-my-pay',
  templateUrl: './my-pay.component.html',
  styleUrls: ['./my-pay.component.css']
})
export class MyPayComponent implements OnInit {
  loan$!: Observable<any>;
  @ViewChild('modalPayment') modalPayment: any;
  loan:any;
  payments:any = [];
  constructor(private loanService: LoanService,
              private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loan$ = this.loanService.getMoneyLoan();
    this.loan = JSON.parse(localStorage['loan_amount'])
    this.getMyPayment();
  }
  openModal() {
    this.modalService.open(this.modalPayment);
  }
  getMyPayment() {
    let loanId = this.loan.id;
    this.loanService.getPayment(loanId).subscribe(res => {
      this.payments = res.payments;
      console.log(this.payments)
    });
  }
}
