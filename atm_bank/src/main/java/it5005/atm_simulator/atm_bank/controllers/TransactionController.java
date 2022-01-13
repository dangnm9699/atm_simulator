package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.Transaction;
import it5005.atm_simulator.atm_bank.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/withdraw/{number}/{ip}")
    public ResponseEntity<Transaction> withDraw(
            @PathVariable("number") String number,
            @PathVariable("ip") String ip,
            String money
    ){
        String money_1 = "30000" ;
        Double amount = Double.parseDouble(money_1);
        Transaction transaction_new = transactionService.withDraw(number, ip, amount);
        if (transaction_new != null) {
            return new ResponseEntity<>(transaction_new, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
