package it5005.atm_simulator.atm_bank.payload;

import it5005.atm_simulator.atm_bank.models.Atm;
import lombok.Data;

@Data
public class AtmResponse {
    private String name;
    private String ip;
    private String location;
    private String description;
    private Double fee;

    public AtmResponse() {

    }

    public AtmResponse(Atm atm) {
        this.name = atm.getName();
        this.ip = atm.getIp();
        this.location = atm.getLocation();
        this.description = atm.getDescription();
        this.fee = atm.getFee();
    }

    public AtmResponse AtmResponseList(Atm atm) {
        AtmResponse atmResponse = new AtmResponse();
        atmResponse.name = atm.getName();
        atmResponse.ip = atm.getIp();
        atmResponse.location = atm.getLocation();
        atmResponse.description = atm.getDescription();
        atmResponse.fee = atm.getFee();
        return atmResponse;
    }

}
