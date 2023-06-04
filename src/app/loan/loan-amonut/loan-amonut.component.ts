import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-loan-amonut',
  templateUrl: './loan-amonut.component.html',
  styleUrls: ['./loan-amonut.component.css']
})
export class LoanAmonutComponent implements OnInit {
  loan: any = [];
  data: any;
  user: any;
  currentUser: any;
  user$!: Observable<any>;
  constructor(
    private userSer: UserService,
    private router: Router,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.loan = JSON.parse(localStorage['loan_amount'])
    this.currentUser = JSON.parse(localStorage['currentUser']);
    const userId = this.currentUser.id;

    this.user$ = this.loanService.getMoneyLoan(userId);
  }
  handleLoan() {
    this.userSer.storeLoan(this.loan).subscribe(res => {
      this.data = res;
      if (this.data.message = 'success') {
        localStorage.setItem('loan_amount', JSON.stringify(this.data.loans));
        this.router.navigate(['/chi-tiet-khoan-vay']);
      }
    });

  }

}
