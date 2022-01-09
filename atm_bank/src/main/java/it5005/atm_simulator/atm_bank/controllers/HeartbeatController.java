package it5005.atm_simulator.atm_bank.controllers;

import it5005.atm_simulator.atm_bank.models.Response;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/heartbeat")
public class HeartbeatController {

    @GetMapping("/")
    public String heartbeat() {
        return "OK OK OK";
    }

    @GetMapping("/greeting/{name}")
    public Response greeting(@PathVariable String name) {
        return new Response(name);
    }
}
