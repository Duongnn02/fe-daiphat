import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  loan: any;
  data: any;
  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.loan = JSON.parse(localStorage['loan_amount'])

    this.loanService.show(this.loan.id).subscribe(res => {
      this.data = res.loan;

    });
  }

}
