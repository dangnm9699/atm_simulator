package com.example.bank_system.service;

import com.example.bank_system.model.Cards;
import com.example.bank_system.repository.CardsRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import javax.transaction.Transactional;

@Service
public class CardService {
    @Autowired
    private CardsRepository cardsRepository;

    @Autowired
    private PasswordEncoder encoder;

    @SneakyThrows
    @Transactional
    public Cards loadCardByNumber(String number){
        Cards cards = cardsRepository.findByNumber(number);
        if (cards == null){
            throw new NameNotFoundException(number);
        }
        return cards;
    }

    public void save(Cards cards){
        cards.setPinHash(encoder.encode(cards.getPinHash()));
        cardsRepository.save(cards);
    }

}
