package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.Atm;
import it5005.atm_simulator.atm_bank.repositories.AtmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AtmService {
    @Autowired
    private AtmRepository atmRepository;

    public List<Atm> findListAtm(){
        return atmRepository.findAll();
    }

    public List<Atm> findByAtmFollowLocation(String location){
        return atmRepository.findByLocation(location);
    }

    public Atm createAtm(Atm atm){
        atm.setIp(new BigDecimal(String.valueOf(atm.getIp())));
        atmRepository.save(atm);
        return atm;
    }


}
