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
  private loanCache: { [key: string]: Observable<any> } = {};
  private userCache: { [key: string]: Observable<any> } = {};

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getMoneyLoan();
  }

  getMoneyLoan() {
    const userId = JSON.parse(this.token).id;
    if (this.loanCache[userId]) {
      // Trả về kết quả đã lưu nếu có trong cache
      return this.loanCache[userId];
    } else {
    this.loan$ = this.loanService.getMoneyLoan(userId);
    this.user$ = this.loanService.getMoneyLoan(userId);
    this.loanCache[userId] = this.loan$;
    this.userCache[userId] = this.user$;
    this.isDataLoaded = true;
    }
  }
}
