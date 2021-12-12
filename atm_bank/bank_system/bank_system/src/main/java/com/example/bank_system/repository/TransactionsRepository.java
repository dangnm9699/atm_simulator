package com.example.bank_system.repository;

import com.example.bank_system.model.Transactions;
import org.springframework.data.repository.CrudRepository;

public interface TransactionsRepository extends CrudRepository<Transactions, Long>{
}
