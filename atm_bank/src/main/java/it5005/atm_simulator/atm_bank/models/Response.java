package it5005.atm_simulator.atm_bank.models;

import java.io.Serializable;

public class Response implements Serializable {
    private String message;

    public Response(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
