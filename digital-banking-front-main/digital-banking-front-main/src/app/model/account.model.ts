import { Customer } from "./customer.model";

export interface AccountDetails{
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation{
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;

}

export interface BankAccount{
  id: number;
  balance: number;
  createdAt: Date;
  status: string;
  type:string;
  customerDTO: Customer;
  overdraft?: number;
  interestRate?: number;
}
