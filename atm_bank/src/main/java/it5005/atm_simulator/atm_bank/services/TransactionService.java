package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.Atm;
import it5005.atm_simulator.atm_bank.models.Card;
import it5005.atm_simulator.atm_bank.models.Transaction;
import it5005.atm_simulator.atm_bank.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AtmService atmService;

    @Autowired
    private CardService cardService;

    private final List<Transaction> transactions = new ArrayList<Transaction>();


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

    public Boolean checkBalance(String number, double money) {
        double check_balance = money + 50000;
        Card card = cardService.loadCardByNumber(number);

        BigDecimal amount = new BigDecimal(check_balance);
        BigDecimal balance = card.getBalance();

        if (balance.compareTo(amount) == 1) {
            System.out.println("Account is enough money");
            return true;
        } else {
            System.out.println("Account is not enough money");
            return false;
        }
    }

    public List<Transaction> betweenAccount(String fromNumber, String toNumber, double money, String ip) {
        Date localDate = new Date();
        Transaction transfer_fromNumber = new Transaction();
        Transaction transfer_toNumber = new Transaction();

        // check information card
        // check information Account fromNumber
        if (cardService.checkStatusCard(fromNumber) && cardService.checkStatusCard(toNumber)
                && atmService.checkAtm(ip) && checkBalance(fromNumber, money)) {

            Atm atm = atmService.findByIp(ip);
            Card card_fromNumber = cardService.loadCardByNumber(fromNumber);
            Card card_toNumber = cardService.loadCardByNumber(toNumber);
            BigDecimal amount = new BigDecimal(money);

            card_fromNumber.setBalance(card_fromNumber.getBalance().subtract(amount));
            card_toNumber.setBalance(card_toNumber.getBalance().add(amount));

            cardService.save(card_fromNumber);
            cardService.save(card_toNumber);
            System.out.println("Transaction Success");

            transfer_fromNumber.setName("Account number " + card_fromNumber.getUser().getName() + " transfer:" + money + "to Account " + card_toNumber.getUser().getName());
            transfer_fromNumber.setAtm(atm);
            transfer_fromNumber.setCard(card_fromNumber);
            transfer_fromNumber.setCreated_at(localDate);
            transfer_fromNumber.setDescription("Transfer Between Account");
            transfer_fromNumber.setAmount(amount);

            transfer_toNumber.setName("Account number " + card_fromNumber.getNumber() + " transfer: " + money + "to Account " + card_toNumber.getUser().getName());
            transfer_toNumber.setAtm(atm);
            transfer_toNumber.setCard(card_toNumber);
            transfer_toNumber.setCreated_at(localDate);
            transfer_toNumber.setDescription("Transfer Between Account");
            transfer_toNumber.setAmount(amount);

            transactionRepository.save(transfer_fromNumber);
            transactionRepository.save(transfer_toNumber);
            System.out.println("Save Transaction Success");

            transactions.add(transfer_fromNumber);
            transactions.add(transfer_toNumber);
            return transactions;
        }

        return null;

    }

    public BigDecimal checkRemainingBalance(String fromNumber,double money ){
        Card card_fromNumber = cardService.loadCardByNumber(fromNumber);
        BigDecimal amount = new BigDecimal(money);

        return card_fromNumber.getBalance().subtract(amount);
    }




}
