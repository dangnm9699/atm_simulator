package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.Transaction;
import it5005.atm_simulator.atm_bank.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/withdraw/{number}/{ip}")
    public ResponseEntity<Transaction> withDraw(
            @PathVariable("number") String number,
            @PathVariable("ip") String ip,
            @RequestBody String money
    ) {
        Double amount = Double.parseDouble(money);
        Transaction transaction_new = transactionService.withDraw(number, ip, amount);
        if (transaction_new != null) {
            return new ResponseEntity<>(transaction_new, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
