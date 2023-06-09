import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) {}

  show(id: any): Observable<any>{
    return this.http.get(environment.url + 'loan/' + id);
  }
  loanApproved(): Observable<any>{
    return this.http.get(environment.url + 'loan-approved');
  }
  viewed(): Observable<any>{
    return this.http.get(environment.url + 'viewed');
  }
  getMoneyLoan(id: any): Observable<any> {
    return this.http.get(environment.url + 'get-money-loan/' + id)
  }
  handleWithdrawl(id: any): Observable<any> {
    return this.http.get(environment.url + 'handle-withdrawl/' + id)
  }

}
