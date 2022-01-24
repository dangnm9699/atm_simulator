package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.Card;
import it5005.atm_simulator.atm_bank.models.CardDetails;
import it5005.atm_simulator.atm_bank.models.User;
import it5005.atm_simulator.atm_bank.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Date;

@Service
public class CardService implements UserDetailsService {
    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserService userService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String number) {
        Card card = cardRepository.findByNumber(number);
        if (card == null) {
            throw new UsernameNotFoundException(number);
        }
        return new CardDetails(card);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        Card card = cardRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return new CardDetails(card);
    }

    public Card loadCardByNumber(String number) {
        Card card_new = cardRepository.findByNumber(number);
        return card_new;
    }

    public boolean createCard(long id, Card card) {
        try {
            User user = userService.findById(id);

            Date localDate = new Date();
            BigDecimal balance = card.getBalance();

            card.setValidFrom(localDate);
            card.setGoodThru(localDate);
            card.setPinHash(passwordEncoder().encode(card.getPinHash()));
            card.setBalance(balance);
            card.setStatus(true);
            card.setUser(user);
            cardRepository.save(card);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Card depositCardBalance(String number, double money) {
        Date localDate = new Date();
        try {
            Card card_old = cardRepository.findByNumber(number);
            BigDecimal balance = card_old.getBalance();
            balance = balance.add(new BigDecimal(money));
            card_old.setBalance(balance);
            card_old.setGoodThru(localDate);
            cardRepository.save(card_old);
            return card_old;
        } catch (Exception e) {
            return null;
        }
    }

    public Card saveCard(Card card) {
        card.setPinHash(passwordEncoder().encode(card.getPinHash()));
        cardRepository.save(card);
        return card;
    }

    public void save(Card card) {
        cardRepository.save(card);
    }

    public boolean checkStatusCard(String number) {
        Card card_now = cardRepository.findByNumber(number);

        if (card_now != null) {
            if (card_now.getStatus()) {
                System.out.println("Card is action");
                return true;
            } else {
                System.out.println("Card is not action");
                return false;
            }
        }
        System.out.println("Card is not exit");
        return false;
    }


}
