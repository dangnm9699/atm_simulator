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

//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    CardRepository cardRepository;
//
//    @Autowired
//    PasswordEncoder passwordEncoder;

//    @Override
//    public void run(String... args) throws Exception {
//        User user = new User();
//        user.setId(3L);
//        user.setDescription("test user");
//        user.setName("dangnm");
//        userRepository.save(user);
//
//        Card card = new Card();
//        card.setId(3L);
//        card.setBalance(BigDecimal.valueOf(1000000));
//        DateFormat df = new SimpleDateFormat("MM/yyyy");
//        try {
//            Date goodThru = df.parse("06/25");
//            card.setGoodThru(goodThru);
//            Date validFrom = df.parse("06/20");
//            card.setValidFrom(validFrom);
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//        card.setNumber("1234567890913345");
//        card.setStatus(true);
//        card.setPinHash(passwordEncoder.encode("password"));
//        card.setUser(user);
//
//        cardRepository.save(card);
//        System.out.println(user);
//    }
}
