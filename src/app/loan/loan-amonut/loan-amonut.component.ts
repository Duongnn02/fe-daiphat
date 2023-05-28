import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private userSer: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loan = JSON.parse(localStorage['loan_amount'])
    this.user = JSON.parse(localStorage['currentUser']);

  }
  handleLoan() {
    this.userSer.storeLoan(this.loan).subscribe(res => {
      this.data = res;
      if (this.data.message = 'success') {
        localStorage.setItem('loan_amount', JSON.stringify(this.data.loans));
        this.router.navigate(['/chi-tiet-khoan-vay']);
      }
    })
  }

}
