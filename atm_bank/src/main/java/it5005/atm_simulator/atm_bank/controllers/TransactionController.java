package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.Transaction;
import it5005.atm_simulator.atm_bank.payload.TransactionRequest;
import it5005.atm_simulator.atm_bank.payload.TransactionResponse;
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

    @PostMapping("/withdraw")
    public ResponseEntity<TransactionResponse> withDraw(
            @RequestBody TransactionRequest transactionRequest
    ) {
        Double amount = Double.parseDouble(transactionRequest.getMoney());
        Transaction transaction_new = transactionService.withDraw(transactionRequest.getNumber(), transactionRequest.getIp(), amount);
        if (transaction_new != null) {
            return new ResponseEntity<>(new TransactionResponse(transaction_new), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
