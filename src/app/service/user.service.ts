import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loan } from '../ts/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  show(id: number): Observable<any>{
    return this.http.get(environment.url + 'user/' + id);
  }
  fakerData(): Observable<any>{
    return this.http.get(environment.url + 'data-customer');
  }
  storeLoan(data: Loan): Observable<Loan[]>{
    return this.http.post<Loan[]>(environment.url + 'loan-store', data);
  }

}
