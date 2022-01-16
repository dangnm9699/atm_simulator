package it5005.atm_simulator.atm_bank.payload;

import it5005.atm_simulator.atm_bank.models.User;
import lombok.Data;

@Data
public class UserResponse {
    private String name;
    private String description;

    public UserResponse(User user){
        this.name = user.getName();
        this.description = user.getDescription();
    }
}
