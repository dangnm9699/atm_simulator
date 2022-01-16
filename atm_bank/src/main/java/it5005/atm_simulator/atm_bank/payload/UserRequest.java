package it5005.atm_simulator.atm_bank.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserRequest {
    @NotNull
    private String name;

    @NotBlank
    private String description;


}
