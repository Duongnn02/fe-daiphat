import { Component, OnInit } from '@angular/core';
import { LoanService } from '../service/loan.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  loan: any;
  token: any;
  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getMoneyLoan();
  }

  getMoneyLoan() {
    this.loanService.getMoneyLoan(JSON.parse(this.token).id).subscribe(res => {
      this.loan = res.sum || 0;
    });
  }
}
