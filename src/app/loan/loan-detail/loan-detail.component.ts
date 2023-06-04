import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  loan: any;
  data: any;
  currentUser: any;
  user$!: Observable<any>;
  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.loan = JSON.parse(localStorage['loan_amount'])
    this.currentUser = localStorage.getItem('currentUser');
    const userId = JSON.parse(this.currentUser).id;
    this.user$ = this.loanService.getMoneyLoan(userId);

    this.loanService.show(this.loan.id).subscribe(res => {
      this.data = res.loan;

    });
  }

}
