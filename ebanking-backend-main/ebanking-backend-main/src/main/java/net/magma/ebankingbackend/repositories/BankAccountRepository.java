package net.magma.ebankingbackend.repositories;

import net.magma.ebankingbackend.entities.BankAccount;
import net.magma.ebankingbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    @Query("SELECT ba FROM BankAccount ba JOIN FETCH ba.customer WHERE ba.customer.id = :customerId")
    List<BankAccount> findAccountsByCustomerId(@Param("customerId") String customerId);

}
