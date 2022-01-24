package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.User;
import it5005.atm_simulator.atm_bank.payload.UserRequest;
import it5005.atm_simulator.atm_bank.payload.UserResponse;
import it5005.atm_simulator.atm_bank.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<UserResponse> getUserById(@RequestBody String name) {
        try {
            User user = userService.findByName(name);
            return new ResponseEntity<>(new UserResponse(user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest user) {
        try {
            User user_need_create = new User();
            user_need_create.setName(user.getName());
            user_need_create.setDescription(user.getDescription());
            User user_new = userService.createUser(user_need_create);
            return new ResponseEntity<>(new UserResponse(user_new), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("")
    public ResponseEntity<UserResponse> updateUser(
            @RequestParam long id,
            @RequestBody UserRequest user) {
        User user_need_update = new User();
        user_need_update.setName(user.getName());
        user_need_update.setDescription(user.getDescription());

        if (userService.updateUser(user_need_update, id)) {
            User user_new = userService.findById(id);
            return new ResponseEntity<>(new UserResponse(user_new), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody long id) {
        if (userService.deleteUser(id)) {
            System.out.println("Remove User Sucess");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
