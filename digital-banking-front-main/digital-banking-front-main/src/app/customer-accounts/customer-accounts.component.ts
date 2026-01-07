import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { AccountsService } from '../services/accounts.service';
import { BankAccount } from '../model/account.model';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent {
  customerId!: string;
  customer!:Customer;
  listAccounts!: BankAccount[];

  constructor(private route: ActivatedRoute, private router: Router, private accountsService: AccountsService ){
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getAccountsByCustomer();

  }

  getAccountsByCustomer(){
    this.accountsService.getAccountsByCustomer(this.customerId).subscribe({
      next: (res)=>{
        console.log("====>",res)
        this.listAccounts = res;
        console.log("list accounts",this.listAccounts)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  goToOperations(account: BankAccount){
    this.router.navigateByUrl("/admin/accounts", {state:{accountId: account.id}})

  }

}
