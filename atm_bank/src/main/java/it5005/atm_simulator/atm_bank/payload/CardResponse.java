package it5005.atm_simulator.atm_bank.payload;

import it5005.atm_simulator.atm_bank.models.Card;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CardResponse {
    private String number;
    private String pinHash;
    private BigDecimal balance;
    private String name;

    public CardResponse(Card card, String name) {
        this.number = card.getNumber();
        this.balance = card.getBalance();
        this.name = name;
    }

    public CardResponse(Card card) {
        this.number = card.getNumber();
        this.balance = card.getBalance();
    }
}
