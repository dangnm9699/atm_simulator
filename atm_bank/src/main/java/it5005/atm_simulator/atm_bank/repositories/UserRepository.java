package it5005.atm_simulator.atm_bank.repositories;

import it5005.atm_simulator.atm_bank.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);

    List<User> findAll();


}
