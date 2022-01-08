package com.example.bank_system.controllers;


import com.example.bank_system.model.Users;
import com.example.bank_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService){
        super();
        this.userService = userService;
    }

    // build create user REST API
    @PostMapping()
    public ResponseEntity<Users> saveUser(@RequestBody Users users){
        return new ResponseEntity<Users>(userService.save(users), HttpStatus.CREATED);
    }

    // build get all users REST API
    @GetMapping("/users")
    public List<Users> getAllUsers(){
        return userService.listAll();
    }

    // build get users by id REST API
    @GetMapping("/user/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable(value="id") long userId)  {
        return new ResponseEntity<Users>(userService.get(userId), HttpStatus.OK);
    }

    // build update users REST API
    @PutMapping("/user/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable("id") long id, @RequestBody Users users){
        return new ResponseEntity<Users>(userService.updateUser(users,id), HttpStatus.OK);
    }

    // build delete user REST API
    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long id){
        // delete user from DB
        userService.deleteUser(id);

        return new ResponseEntity<String>("User deleted succefully!", HttpStatus.OK);
    }

}
