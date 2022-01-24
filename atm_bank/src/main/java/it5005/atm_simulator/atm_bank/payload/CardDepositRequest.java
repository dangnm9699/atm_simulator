package it5005.atm_simulator.atm_bank.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CardDepositRequest {
    @NotBlank
    private String number;

    @NotBlank
    private String amount;
}
