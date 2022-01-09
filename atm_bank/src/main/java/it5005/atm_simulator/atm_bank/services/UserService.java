package it5005.atm_simulator.atm_bank.services;

import it5005.atm_simulator.atm_bank.models.User;
import it5005.atm_simulator.atm_bank.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(long id) {
        Optional<User> user_new = userRepository.findById(id);
        return user_new.get();
    }

    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    public User createUser(User user) {
        userRepository.save(user);
        return user;
    }

    public Boolean updateUser(User user, long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User _user = userData.get();
            _user.setName(user.getName());
            _user.setDescription(user.getDescription());
            userRepository.save(_user);
            return true;
        } else {
            return false;
        }
    }

    public Boolean deleteUser(long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
