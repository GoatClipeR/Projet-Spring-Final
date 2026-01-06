import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AccountDetails, BankAccount } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  backendHost : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number):Observable<AccountDetails>{
    return  this.http.get<AccountDetails>(this.backendHost+"accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId: string, amount: number, description: string){
    let data = {accountId, amount, description};
    return  this.http.post(this.backendHost+"accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string){
    let data = {accountId, amount, description};
    return  this.http.post(this.backendHost+"accounts/credit", data);
  }

   public transfer(accountSource: string, accountDestination: string,  amount: number){
    let data = {accountSource, accountDestination, amount};
    return  this.http.post(this.backendHost+"accounts/transfer", data);
  }

  public getAccountsByCustomer(customerId: string):Observable<BankAccount[]>{
   return this.http.get<BankAccount[]>(this.backendHost+"accounts/customer/"+customerId);
  }

}
