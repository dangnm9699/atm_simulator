package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.Atm;
import it5005.atm_simulator.atm_bank.payload.AtmRequest;
import it5005.atm_simulator.atm_bank.payload.AtmResponse;
import it5005.atm_simulator.atm_bank.services.AtmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/atm")
public class AtmController {
    @Autowired
    private AtmService atmService;

    @GetMapping("")
    public ResponseEntity<List<AtmResponse>> getListAtms(
            @RequestParam(required = false) String location) {
        try {
            List<Atm> atms = new ArrayList<>();

            if (location == null) {
                atmService.findListAtm().forEach(atms::add);
            } else {
                atmService.findByAtmFollowLocation(location).forEach(atms::add);
            }

            if (atms.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            List<AtmResponse> atmResponses = new ArrayList<>();
            for (Atm atm : atms) {
                atmResponses.add(new AtmResponse(atm));
            }
            return new ResponseEntity<>(atmResponses, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("")
    public ResponseEntity<AtmResponse> createDataAtm(@RequestBody AtmRequest atmRequest) {
        if (atmService.findByIp(atmRequest.getIp()) != null) {
            return new ResponseEntity<>(null, HttpStatus.ALREADY_REPORTED);
        }
        try {
            Atm atm = new Atm();
            atm.setName(atmRequest.getName());
            atm.setIp(atmRequest.getIp());
            atm.setLocation(atmRequest.getLocation());
            atm.setDescription(atmRequest.getDescription());
            Atm atm_new = atmService.createAtm(atm);
            return new ResponseEntity<>(new AtmResponse(atm_new), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("")
    public ResponseEntity<AtmResponse> updateAtm(@RequestParam long id, @RequestBody AtmRequest atmRequest) {
        if (atmService.findByIp(atmRequest.getIp()) == null) {
            return new ResponseEntity<>(null, HttpStatus.ALREADY_REPORTED);
        }
        try {
            Atm atm = new Atm();
            atm.setName(atmRequest.getName());
            atm.setIp(atmRequest.getIp());
            atm.setLocation(atmRequest.getLocation());
            atm.setDescription(atmRequest.getDescription());
            Atm atm_new = atmService.updateAtm(atm, id);
            return new ResponseEntity<>(new AtmResponse(atm_new), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<HttpStatus> deleteAtm(@RequestParam long id) {
        if (atmService.deleteAtm(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}