package it5005.atm_simulator.atm_bank.repositories;

import it5005.atm_simulator.atm_bank.models.Atm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtmRepository extends JpaRepository<Atm, Long> {
    List<Atm> findByLocation(String location);

    Atm findByIp(String ip);
}
