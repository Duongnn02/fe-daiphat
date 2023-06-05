import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../service/loan.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],

})
export class WalletComponent implements OnInit {
  @ViewChild('withdrawMoney') withdrawMoney: any;
  token: any;
  loan$!: Observable<any>;
  user$!: Observable<any>;
  isDataLoaded: boolean = false;

  constructor(private loanService: LoanService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getMoneyLoan();
  }

  approval() {
    this.modalService.open(this.withdrawMoney);
  }
  getMoneyLoan() {
    const userId = JSON.parse(this.token).id;
    this.loan$ = this.loanService.getMoneyLoan(userId);
    this.user$ = this.loanService.getMoneyLoan(userId);
  }
}
