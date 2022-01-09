package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.Card;
import it5005.atm_simulator.atm_bank.models.CardDetails;
import it5005.atm_simulator.atm_bank.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CardService implements UserDetailsService {
    @Autowired
    private CardRepository cardRepository;

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
}
