package net.achraf.ebankingbackend;

import net.achraf.ebankingbackend.dtos.BankAccountDTO;
import net.achraf.ebankingbackend.dtos.CurrentBankAccountDTO;
import net.achraf.ebankingbackend.dtos.CustomerDTO;
import net.achraf.ebankingbackend.dtos.SavingBankAccountDTO;
import net.achraf.ebankingbackend.entities.*;
import net.achraf.ebankingbackend.enums.AccountStatus;
import net.achraf.ebankingbackend.enums.OperationType;
import net.achraf.ebankingbackend.exceptions.BalanceNotSufficientException;
import net.achraf.ebankingbackend.exceptions.BankAccountNotFoundException;
import net.achraf.ebankingbackend.exceptions.CustomerNotFoundException;
import net.achraf.ebankingbackend.repositories.AccountOperationRepository;
import net.achraf.ebankingbackend.repositories.BankAccountRepository;
import net.achraf.ebankingbackend.repositories.CustomerRepository;
import net.achraf.ebankingbackend.services.BankAccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class EbankingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbankingBackendApplication.class, args);
    }
    @Bean
     CommandLineRunner init(BankAccountService bankAccountService){
        return args -> {
            Stream.of("Hassan", "Imane", "Rachid").forEach(name -> {
                CustomerDTO customer = new CustomerDTO();
                customer.setName(name);
                customer.setEmail(name + "@gmail.com");
                bankAccountService.saveCustomer(customer);
            });

            bankAccountService.listCustomers().forEach(customer ->{
               try{
                   System.out.println("Creating bank accounts for customer " + customer.getId());
                   bankAccountService.saveCurrentBankAccount(Math.random()*90000,9000, customer.getId());
                   bankAccountService.saveSavingBankAccount(Math.random()*120000,5.5, customer.getId());

               }
               catch(CustomerNotFoundException e){
                   e.printStackTrace();
               }

            });

            List<BankAccountDTO> bankAccounts = bankAccountService.bankAccountList();

            System.out.println("bank accounts ==>"+bankAccounts);
            for(BankAccountDTO bankAccount : bankAccounts){
                for (int i = 0; i < 10 ; i++){
                    String accountId;
                    if(bankAccount instanceof SavingBankAccountDTO){
                        accountId = ((SavingBankAccountDTO) bankAccount).getId();
                    } else {
                        accountId = ((CurrentBankAccountDTO) bankAccount).getId();
                    }
                    bankAccountService.credit(accountId,10000+ Math.random()*120000, "Credit");

                    try {
                        bankAccountService.debit(accountId, 10000 + Math.random() * 120000, "Debit");
                    } catch (BalanceNotSufficientException e) {
                        System.err.println("Débit refusé : " + e.getMessage());
                    }

                }
            }

        };
    }


    //@Bean
    CommandLineRunner commandLineRunner(BankAccountRepository bankAccountRepository){
        return args -> {

            BankAccount bankAccount = bankAccountRepository.findById("1bd541a0-746c-47b5-a2e4-766c36e08158")
                    .orElse(null);
            assert bankAccount != null;
            System.out.println("**********************");
            System.out.println(bankAccount.getId());
            System.out.println(bankAccount.getBalance());
            System.out.println(bankAccount.getCreatedAt());
            System.out.println(bankAccount.getStatus());
            System.out.println(bankAccount.getCustomer().getName());
            System.out.println(bankAccount.getClass().getSimpleName());

            if(bankAccount instanceof CurrentAccount){
                System.out.println("Over Draft ==>"+((CurrentAccount) bankAccount).getOverDraft());
            } else{
                System.out.println("Interest Rate =>"+((SavingAccount) bankAccount).getInterestRate());
            }
            bankAccount.getAccountOperations().forEach(acc -> {
                System.out.println("=====================");
                System.out.println(acc.getType() + "\t" + acc.getAmount() +"\t"+ acc.getAmount());
            });

        };
    }


}
