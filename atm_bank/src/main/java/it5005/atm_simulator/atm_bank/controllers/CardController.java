package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.jwt.JwtTokenProvider;
import it5005.atm_simulator.atm_bank.models.*;
import it5005.atm_simulator.atm_bank.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;

@RestController
@RequestMapping("/card")
public class CardController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CardService cardService;

    @PostMapping("/login")
    public LoginResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken((CardDetails) authentication.getPrincipal());
        return new LoginResponse(jwt);
    }

    @GetMapping("/random")
    public RandomStuff randomStuff() {
        return new RandomStuff("JWT Hợp lệ mới có thể thấy được message này");
    }

    // id of User need create Card
    @PostMapping("/create/{id}")
    public ResponseEntity<String> createCard(@PathVariable("id") long id, @RequestBody Card card) {
        if (cardService.createCard(id, card)) {
            Card card_new = cardService.loadCardByNumber(card.getNumber());
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/deposit/{number}")
    public ResponseEntity<Card> depositCard(
            @PathVariable("number") String number,
            @RequestBody String amount) {
        Double money = Double.parseDouble(amount);
        try {
            Card card_new = cardService.depositCardBalance(number, money);
            return new ResponseEntity<>(card_new, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reset/pinHash/{number}")
    public ResponseEntity<Card> resetPinHashCard(
            @PathVariable("number") String number,
            @RequestBody String pinHash) {
        try {
            Card card_new = cardService.loadCardByNumber(number);
            card_new.setPinHash(pinHash);
            return new ResponseEntity<>(cardService.saveCard(card_new), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{number}")
    public ResponseEntity<Card> updateCard(@PathVariable("number") String number, @RequestBody Card card) {
        if (cardService.loadCardByNumber(number) != null) {
            return new ResponseEntity<>(cardService.saveCard(card), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // check Balance card
    @GetMapping("/balance/{number}")
    public ResponseEntity<BigDecimal> checkBalance(@PathVariable("number") String number) {
        BigDecimal amount = new BigDecimal("0");
        try {
            Card card_new = cardService.loadCardByNumber(number);
            BigDecimal balance = card_new.getBalance();
            System.out.println(balance);
            return new ResponseEntity<>(balance, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(amount, HttpStatus.NOT_FOUND);
        }
    }


}
