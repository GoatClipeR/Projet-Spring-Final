package net.magma.ebankingbackend.dtos;

import jakarta.persistence.*;
import lombok.Data;
import net.magma.ebankingbackend.entities.BankAccount;
import net.magma.ebankingbackend.enums.OperationType;

import java.util.Date;

@Data
public class AccountOperationDTO {
    private Long id;
    private Date operationDate;
    private Double amount;
    private OperationType type;
    private String description;
}
