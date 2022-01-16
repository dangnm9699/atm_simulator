package it5005.atm_simulator.atm_bank.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AtmRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String ip;

    @NotBlank
    private String location;

    @NotBlank
    private String description;
}
