package it5005.atm_simulator.atm_bank.repositories;

import it5005.atm_simulator.atm_bank.models.Card;
import it5005.atm_simulator.atm_bank.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Card findByNumber(String number);

    List<Card> findByUser(User user);
}
