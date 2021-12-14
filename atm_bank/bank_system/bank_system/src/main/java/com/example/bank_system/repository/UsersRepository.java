package com.example.bank_system.repository;

import com.example.bank_system.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByName(String name);
    List<Users> findAll();
}
