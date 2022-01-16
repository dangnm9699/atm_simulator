package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.Atm;
import it5005.atm_simulator.atm_bank.models.Card;
import it5005.atm_simulator.atm_bank.models.Transaction;
import it5005.atm_simulator.atm_bank.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AtmService atmService;

    @Autowired
    private CardService cardService;

    public Transaction withDraw(String number, String ip, double money) {
        Date localDate = new Date();
        double check_balance = money + 50000;
        try {
            Atm atm = atmService.findByIp(ip);
            Card card = cardService.loadCardByNumber(number);
            BigDecimal amount = new BigDecimal(check_balance);
            BigDecimal balance = card.getBalance();

            if (balance.compareTo(amount) == 1) {
                card.setBalance(balance.subtract(new BigDecimal(money)));
                cardService.save(card);
                System.out.println("Transaction Success");
                Transaction transaction_new = new Transaction();
                transaction_new.setName(card.getNumber() + " withDraw " + money);
                transaction_new.setAmount(new BigDecimal(money));
                transaction_new.setCreated_at(localDate);
                transaction_new.setDescription("Success");
                transaction_new.setCard(card);
                transaction_new.setAtm(atm);
                transactionRepository.save(transaction_new);
                return transaction_new;
            } else {
                System.out.println("Account is not enough money");
            }
        } catch (Exception e) {
            System.out.println("Number or ip is not incorrect");
        }
        return null;
    }


}
