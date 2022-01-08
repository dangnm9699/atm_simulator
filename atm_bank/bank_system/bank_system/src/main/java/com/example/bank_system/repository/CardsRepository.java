package com.example.bank_system.repository;

import com.example.bank_system.model.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public interface CardsRepository extends JpaRepository<Cards, Long> {

    Cards findByNumber(String number);

}
