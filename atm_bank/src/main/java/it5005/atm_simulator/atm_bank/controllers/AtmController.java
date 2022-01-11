package it5005.atm_simulator.atm_bank.controllers;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import it5005.atm_simulator.atm_bank.models.Atm;
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

    @GetMapping("/listAtm")
    public ResponseEntity<List<Atm>> getListAtms(@RequestParam(required = false) String location){
        try{
            List<Atm> atms = new ArrayList<>();

            if (location == null){
                atmService.findListAtm().forEach(atms::add);
            }else {
                atmService.findByAtmFollowLocation(location).forEach(atms::add);
            }

            if(atms.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(atms, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createAtm")
    public ResponseEntity<Atm> createDataAtm(@RequestBody Atm atm){
        try{
            Atm atm_new = atmService.createAtm(atm);
            return new ResponseEntity<>(atm_new, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
