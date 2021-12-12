package com.example.bank_system.repository;

import com.example.bank_system.model.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UsersRepository extends CrudRepository<Users, Long> {
    Users findByName(String name);
    List<Users> findAll();
}
