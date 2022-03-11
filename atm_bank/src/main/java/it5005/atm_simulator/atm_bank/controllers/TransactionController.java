package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.Transaction;
import it5005.atm_simulator.atm_bank.payload.TransactionRequest;
import it5005.atm_simulator.atm_bank.payload.TransactionResponse;
import it5005.atm_simulator.atm_bank.payload.TransferRequest;
import it5005.atm_simulator.atm_bank.payload.TransferResponse;
import it5005.atm_simulator.atm_bank.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/withdraw")
    public ResponseEntity<TransactionResponse> withDraw(
            @RequestBody TransactionRequest transactionRequest
    ) {
        Double amount = transactionRequest.getMoney();

        Transaction transaction_new = transactionService.withDraw(transactionRequest.getNumber(), transactionRequest.getIp(), amount);
        if (transaction_new != null) {
            return new ResponseEntity<>(new TransactionResponse(transaction_new), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/withdraw/check")
    public ResponseEntity<String> withDrawCheck(@RequestBody TransactionRequest transactionRequest){
        Double amount = transactionRequest.getMoney();
        String number = transactionRequest.getNumber();
        String ip = transactionRequest.getIp();

        if (transactionService.checkBalance(number, amount, ip)){
            return new ResponseEntity<>(""+transactionService.checkRemainingBalance(number, amount,ip), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Account is not enough money", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransferResponse> betweenAccounts(
            @RequestBody TransferRequest transferRequest
    ) {
        Double amount = transferRequest.getMoney();
        String fromNumber = transferRequest.getTransferFromNumber();
        String toNumber = transferRequest.getTransferToNumber();
        String ip = transferRequest.getID();

        if (fromNumber == toNumber) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }

        List<Transaction> transactions = transactionService.betweenAccount(fromNumber, toNumber, amount, ip);

        if (transactions != null) {
            Transaction transferFrom = transactions.get(0);
            Transaction transferTo = transactions.get(1);
            return new ResponseEntity<>(new TransferResponse(transferFrom, transferTo), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/transfer/check")
    public ResponseEntity<String> checkAccounts(@RequestBody TransferRequest transferRequest){
        Double amount = transferRequest.getMoney();
        String fromNumber = transferRequest.getTransferFromNumber();
        String toNumber = transferRequest.getTransferToNumber();
        String ip = transferRequest.getID();

        if (fromNumber == toNumber){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }

        if (transactionService.checkBalance(fromNumber, amount, ip)){
            return new ResponseEntity<>(""+transactionService.checkRemainingBalance(fromNumber, amount,ip), HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Account is not enough money", HttpStatus.BAD_REQUEST);
        }
    }
}
