package it5005.atm_simulator.atm_bank.payload;

import it5005.atm_simulator.atm_bank.models.Transaction;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class TransactionResponse {
    private String name;
    private BigDecimal amount;
    private Date created_at;
    private String description;

    private String number;
    private String ip;

    public TransactionResponse(Transaction transaction){
        this.name = transaction.getName();
        this.amount = transaction.getAmount();
        this.created_at = transaction.getCreated_at();
        this.description = transaction.getDescription();

        this.number = transaction.getCard().getNumber();
        this.ip = transaction.getAtm().getIp();
    }
}
