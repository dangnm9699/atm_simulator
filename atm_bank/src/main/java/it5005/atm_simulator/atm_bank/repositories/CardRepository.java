package it5005.atm_simulator.atm_bank.repositories;

import it5005.atm_simulator.atm_bank.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Card findByNumber(String number);
}
