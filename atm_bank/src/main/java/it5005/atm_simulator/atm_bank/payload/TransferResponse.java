package it5005.atm_simulator.atm_bank.payload;

import it5005.atm_simulator.atm_bank.models.Transaction;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class TransferResponse {
    private String name;
    private String transferFromNumber;
    private String transferToNumber;
    private BigDecimal amount;
    private Date created_at;
    private String description;
    private String ip;
    private BigDecimal fee_detail;

    public TransferResponse(Transaction transferFrom, Transaction transferTo) {
        this.name = transferFrom.getName();

        this.transferFromNumber = transferFrom.getCard().getNumber();
        this.transferToNumber = transferTo.getCard().getNumber();
        this.amount = transferFrom.getAmount();
        this.fee_detail = transferFrom.getFee_detail();

        this.created_at = transferFrom.getCreated_at();
        this.description = transferFrom.getDescription();

        this.ip = transferFrom.getAtm().getIp();
    }

}
