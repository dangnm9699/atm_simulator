package com.example.bank_system.repository;

import com.example.bank_system.model.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardsRepository extends JpaRepository<Cards, Long> {
    Cards findByName(String name);
    Cards findById(long id);

}
