package it5005.atm_simulator.atm_bank.repositories;

import it5005.atm_simulator.atm_bank.models.Atm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtmRepository extends JpaRepository<Atm, Long> {
}
