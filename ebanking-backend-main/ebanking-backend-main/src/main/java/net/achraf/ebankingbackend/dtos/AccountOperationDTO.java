package net.achraf.ebankingbackend.dtos;

import jakarta.persistence.*;
import lombok.Data;
import net.achraf.ebankingbackend.entities.BankAccount;
import net.achraf.ebankingbackend.enums.OperationType;

import java.util.Date;

@Data
public class AccountOperationDTO {
    private Long id;
    private Date operationDate;
    private Double amount;
    private OperationType type;
    private String description;
}
