package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.jwt.JwtTokenProvider;
import it5005.atm_simulator.atm_bank.models.*;
import it5005.atm_simulator.atm_bank.payload.CardDepositRequest;
import it5005.atm_simulator.atm_bank.payload.CardRequest;
import it5005.atm_simulator.atm_bank.payload.CardResponse;
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
                        loginRequest.getNumber(),
                        loginRequest.getPinHash()
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
    @PostMapping("")
    public ResponseEntity<String> createCard(@RequestParam long user_id, @RequestBody CardRequest cardRequest) {
        Card card = new Card();
        card.setNumber(cardRequest.getNumber());
        card.setPinHash(cardRequest.getPinHash());
        card.setBalance(cardRequest.getBalance());

        if (cardService.loadCardByNumber(cardRequest.getNumber()) == null){
            if (cardService.createCard(user_id, card)){
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/deposit")
    public ResponseEntity<CardResponse> depositCard(
            @RequestBody CardDepositRequest cardDepositRequest) {
        Double money = Double.parseDouble(cardDepositRequest.getAmount());
        try {
            Card card_new = cardService.depositCardBalance(cardDepositRequest.getNumber(), money);
            return new ResponseEntity<>(new CardResponse(card_new), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/pinHash")
    public ResponseEntity<String> resetPinHashCard(
            @RequestBody LoginRequest loginRequest) {
        try {
            Card card_new = cardService.loadCardByNumber(loginRequest.getNumber());
            card_new.setPinHash(loginRequest.getPinHash());
            cardService.saveCard(card_new);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("")
    public ResponseEntity<CardResponse> updateCard(@RequestBody CardRequest cardRequest) {
        String number = cardRequest.getNumber();
        Card card = new Card();
        card.setNumber(cardRequest.getNumber());
        card.setPinHash(cardRequest.getPinHash());
        card.setBalance(cardRequest.getBalance());
        if (cardService.loadCardByNumber(number) != null) {
            cardService.saveCard(card);
            return new ResponseEntity<>(new CardResponse(card), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // check Balance card
    @GetMapping("/balance")
    public ResponseEntity<BigDecimal> checkBalance(@RequestParam String number) {
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

    @GetMapping("")
    public ResponseEntity<CardResponse> getCardDetail(@RequestParam String number) {
        try {
            Card card_new = cardService.loadCardByNumber(number);
            return new ResponseEntity<>(new CardResponse(card_new), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


}
