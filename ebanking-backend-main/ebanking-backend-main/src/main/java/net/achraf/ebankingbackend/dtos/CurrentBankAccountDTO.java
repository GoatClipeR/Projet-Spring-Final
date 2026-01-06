package net.achraf.ebankingbackend.dtos;

import jakarta.persistence.Id;
import lombok.Data;
import net.achraf.ebankingbackend.enums.AccountStatus;

import java.util.Date;

@Data
public class CurrentBankAccountDTO extends BankAccountDTO {
    @Id
    private String id;
    private Double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDTO customerDTO;
    private double overdraft;
}
