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
    public ResponseEntity<Card> depositCard(@PathVariable("number") String number, String amount){
        Double money = Double.parseDouble(amount);
        try{
            Card card_new = cardService.depositCardBalance(number, money);
            return new ResponseEntity<>(card_new, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
