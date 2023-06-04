import { Component, OnInit } from '@angular/core';
import { LoanService } from '../service/loan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],

})
export class WalletComponent implements OnInit {
  token: any;
  loan$!: Observable<any>;
  user$!: Observable<any>;
  isDataLoaded: boolean = false;

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getMoneyLoan();
  }

  getMoneyLoan() {
    const userId = JSON.parse(this.token).id;
    this.loan$ = this.loanService.getMoneyLoan(userId);
    this.user$ = this.loanService.getMoneyLoan(userId);
  }
}
