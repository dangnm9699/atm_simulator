package it5005.atm_simulator.atm_bank;

import it5005.atm_simulator.atm_bank.models.Card;
import it5005.atm_simulator.atm_bank.models.User;
import it5005.atm_simulator.atm_bank.repositories.CardRepository;
import it5005.atm_simulator.atm_bank.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
@Configuration
public class AtmBankApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(AtmBankApplication.class, args);
    }

    @Autowired
    UserRepository userRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String Descrition = "Init user";
        String Name = "Hoang Manh Hung";
        String Number = "111222333888";
        String password = "123456";

        User user = new User();
        user.setDescription(Descrition);
        user.setName(Name);
        if (userRepository.findByName(user.getName()) != null) {
            System.out.println("User already exists ");
            return;
        }
        Card card = new Card();
        card.setBalance(BigDecimal.valueOf(1000000));
        DateFormat df = new SimpleDateFormat("MM/yyyy");
        try {
            Date goodThru = df.parse("01/25");
            card.setGoodThru(goodThru);
            Date validFrom = df.parse("01/20");
            card.setValidFrom(validFrom);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        card.setNumber(Number);
        card.setStatus(true);
        card.setPinHash(passwordEncoder.encode(password));
        card.setUser(user);

        if (cardRepository.findByNumber(card.getNumber()) != null) {
            System.out.println("Card already exists ");
            return;
        }
        userRepository.save(user);
        cardRepository.save(card);
        System.out.println(user);
    }
}
