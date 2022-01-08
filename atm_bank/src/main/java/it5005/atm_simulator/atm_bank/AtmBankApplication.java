package it5005.atm_simulator.atm_bank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class AtmBankApplication {

    public static void main(String[] args) {
        SpringApplication.run(AtmBankApplication.class, args);
    }

}
