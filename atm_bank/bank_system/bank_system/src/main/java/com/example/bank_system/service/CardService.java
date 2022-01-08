package com.example.bank_system.service;

import com.example.bank_system.model.Cards;
import com.example.bank_system.repository.CardsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;

@Service
public class CardService {
    @Autowired
    private CardsRepository cardsRepository;

    public Cards loadNameByName(String name) throws NameNotFoundException {
        Cards cards = cardsRepository.findByName(name);
        if (cards == null){
            throw new NameNotFoundException(name);
        }
        return cards;
    }
}
