package com.example.bank_system.service;

public interface SecurityService {
    boolean isAuthenticated();
    void autoLogin(String number, String pinhash);
}
