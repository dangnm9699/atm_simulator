package com.example.bank_system.service;

import com.example.bank_system.exception.ResourceNotFoundException;
import com.example.bank_system.model.Users;
import com.example.bank_system.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UsersRepository usersRepository;

    public List<Users> listAll(){
        return usersRepository.findAll();
    }

    public Users get(long id){
        return usersRepository.findById(id).get();
    }

    public Users save(Users users){
        return usersRepository.save(users);
    }

    public Users updateUser(Users users, long id){
        Users existingUser = usersRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "Id", id)
        );
        existingUser.setName(users.getName());
        existingUser.setDescription(users.getDescription());

        usersRepository.save(existingUser);
        return existingUser;
    };

    public void deleteUser(long id){
        usersRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("User","Id",id));
        usersRepository.deleteById(id);
    }

}
