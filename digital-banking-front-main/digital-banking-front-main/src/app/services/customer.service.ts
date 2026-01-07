import { Customer } from './../model/customer.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backendHost : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Customer[]>{
    return this.http.get<Array<Customer>>(this.backendHost+"customers");
  }


  public searchCustomers(keyword: string): Observable<Customer[]>{
    return this.http.get<Array<Customer>>(this.backendHost+"customers/search?keyword=" +keyword);
  }

  public saveCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.backendHost+"customers", customer);
  }

  public deleteCustomer(id: number){
    return this.http.delete<Customer>(this.backendHost+"customers/" +id);
  }


}
