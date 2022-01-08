package com.example.bank_system;

import com.example.bank_system.model.Cards;
import com.example.bank_system.model.Users;
import com.example.bank_system.repository.CardsRepository;
import com.example.bank_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Date;

@SpringBootApplication
public class BankSystemApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BankSystemApplication.class, args);
	}

	@Autowired
	CardsRepository cardsRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserService userService;

	@Override
	public void run(String... args) throws Exception{
		double amount = 1200000;
		Users users = userService.get(1);
		Cards cards = new Cards();
		cards.setNumber("dat123@dat123");
		cards.setValidFrom(new Date());
		cards.setGoodThru(new Date());
		cards.setPinHash(passwordEncoder.encode("dat123"));
		cards.setBalance(new BigDecimal(amount));
		cards.setStatus(true);
		cards.setUsers(users);
		cardsRepository.save(cards);
		System.out.println(cards);
	}
}
