import { CustomerService } from './../services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {

  newCustomerFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(
     private fb: FormBuilder,
     private customerService: CustomerService,
  ){}

  ngOnInit(): void {
  this.newCustomerFormGroup = this.fb.group({
    name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
    email: this.fb.control(null, [Validators.email, Validators.required]),

  })

  }

  handleSaveCustomer(){
    let customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next:(data) =>{
        alert("Customer has been successfuly saved!");
        this.newCustomerFormGroup.reset();
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

}
