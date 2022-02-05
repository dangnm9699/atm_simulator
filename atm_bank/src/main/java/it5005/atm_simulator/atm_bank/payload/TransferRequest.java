package it5005.atm_simulator.atm_bank.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TransferRequest {
    @NotBlank
    private String transferFromNumber;

    @NotBlank
    private String transferToNumber;

    @NotBlank
    private Double money;

    @NotBlank
    private String ID;


}
