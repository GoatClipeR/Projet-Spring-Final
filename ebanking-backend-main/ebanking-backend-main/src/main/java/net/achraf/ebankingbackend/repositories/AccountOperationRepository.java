package net.achraf.ebankingbackend.repositories;

import net.achraf.ebankingbackend.entities.AccountOperation;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountOperationRepository  extends JpaRepository<AccountOperation,Long> {
    List<AccountOperation> findByBankAccountId(String id);

    Page<AccountOperation> findByBankAccountIdOrderByOperationDateDesc(String id, Pageable pageable);
}
