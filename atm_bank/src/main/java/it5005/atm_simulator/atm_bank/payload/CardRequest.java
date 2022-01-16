package it5005.atm_simulator.atm_bank.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Data
public class CardRequest {
    @NotBlank
    private String number;

    @NotBlank
    private String pinHash;

    @NotBlank
    private BigDecimal balance;


}
