package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.Atm;
import it5005.atm_simulator.atm_bank.repositories.AtmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtmService {
    @Autowired
    private AtmRepository atmRepository;

    public List<Atm> findListAtm() {
        return atmRepository.findAll();
    }

    public List<Atm> findByAtmFollowLocation(String location) {
        return atmRepository.findByLocation(location);
    }

    public Atm createAtm(Atm atm) {
        atm.setIp(atm.getIp());
        atmRepository.save(atm);
        return atm;
    }

    public Atm findByIp(String ip) {
        return atmRepository.findByIp(ip);
    }

    public Atm findById(long id) {
        Optional<Atm> atm_new = atmRepository.findById(id);
        return atm_new.get();
    }

    public Atm updateAtm(Atm atm, long id) {
        Optional<Atm> atm_new = atmRepository.findById(id);

        if (atm_new.isPresent()) {
            Atm _atm = atm_new.get();
            _atm.setName(atm.getName());
            _atm.setDescription(atm.getDescription());
            _atm.setLocation(atm.getLocation());
            _atm.setIp(atm.getIp());
            atmRepository.save(_atm);
            return _atm;
        } else {
            return null;
        }
    }

    public Boolean deleteAtm(long id) {
        try {
            atmRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
