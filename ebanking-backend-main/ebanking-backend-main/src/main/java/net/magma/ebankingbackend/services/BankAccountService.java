package net.magma.ebankingbackend.services;

import net.magma.ebankingbackend.dtos.*;
import net.magma.ebankingbackend.entities.BankAccount;
import net.magma.ebankingbackend.entities.CurrentAccount;
import net.magma.ebankingbackend.entities.Customer;
import net.magma.ebankingbackend.entities.SavingAccount;
import net.magma.ebankingbackend.exceptions.BalanceNotSufficientException;
import net.magma.ebankingbackend.exceptions.BankAccountNotFoundException;
import net.magma.ebankingbackend.exceptions.CustomerNotFoundException;

import java.util.List;

public interface BankAccountService {
    CustomerDTO saveCustomer(CustomerDTO customerDTO);
    CurrentBankAccountDTO saveCurrentBankAccount(double initialBalance, double overDraft, Long customerId) throws CustomerNotFoundException;
    SavingBankAccountDTO saveSavingBankAccount(double initialBalance, double interestRate, Long customerId) throws CustomerNotFoundException;

    List<CustomerDTO> listCustomers();
    BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException;
    void debit(String accountId, double amount, String description) throws BankAccountNotFoundException, BalanceNotSufficientException;
    void credit(String accountId, double amount, String description) throws BankAccountNotFoundException;
    void transfer(String accountIdSource, String accountIdDestination, double amount) throws BankAccountNotFoundException, BalanceNotSufficientException;

    List<BankAccountDTO> bankAccountList();

    CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException;

    void deleteCustomer(Long customerId);

    CustomerDTO updateCustomer(CustomerDTO customerDTO);

    List<AccountOperationDTO>  accountHistory(String accountId);

    AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException;

    List<CustomerDTO> searchCustomers(String keyword);

    List<BankAccountDTO> getBankAccountsByCustomer(String customerId);
}
