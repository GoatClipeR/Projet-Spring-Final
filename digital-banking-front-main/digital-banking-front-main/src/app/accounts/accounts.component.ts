import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails, BankAccount } from '../model/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
accountFormGroup!: FormGroup;
currentPage: number = 0;
pageSize: number =5;
accountObservable!: Observable<AccountDetails>;
operationFormGroup!: FormGroup;
errorMessage!: string;
accountId!: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountsService,
    private router: Router,
    public authService: AuthService
  ){

    const nav = this.router.getCurrentNavigation();
    this.accountId = nav?.extras.state?.['accountId'] || '';
    console.log('Account ID reçu:', this.accountId);

   this.accountFormGroup = this.fb.group({
    accountId: this.fb.control(this.accountId)
  });

    if(this.accountId){
      this.handleSearchAccount();
    }
}




  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control("")
    });

    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }

  handleSearchAccount(){
  let accountId = this.accountFormGroup.value.accountId;
   this.accountObservable = this.accountService.getAccount(accountId,this.currentPage, this.pageSize).pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return throwError(err);
    })
   )

  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation(){
    let accountId: string= this.accountFormGroup.value.accountId;
    let operationType: string = this.operationFormGroup.value.operationType;
    let amount : number = this.operationFormGroup.value.amount;
    let description : string = this.operationFormGroup.value.description;
    let accountDestination : string = this.operationFormGroup.value.accountDestination;

    if (operationType == "DEBIT"){
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (res)=>{
          alert("Success Debit");
          this.handleSearchAccount();
          this.operationFormGroup.reset();
        },
        error:(err)=> {
          console.log(err);
        }
      });

    } else if (operationType == "CREDIT"){
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (res)=>{
          alert("Success Credit");
          this.handleSearchAccount();
          this.operationFormGroup.reset();
        },
        error:(err)=> {
          console.log(err);
        }
      });

    } else if (operationType == "TRANSFER"){
      this.accountService.transfer(accountId, accountDestination, amount).subscribe({
        next: (res)=>{
          alert("Success Transfer");
          this.handleSearchAccount();
          this.operationFormGroup.reset();
        },
        error:(err)=> {
          console.log(err);
        }
      });

    }


  }

}
