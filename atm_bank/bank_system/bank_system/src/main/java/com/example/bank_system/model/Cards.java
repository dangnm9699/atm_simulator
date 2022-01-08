package com.example.bank_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="cards")
public class Cards implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    @NotNull
    @Column(name="number", unique = true)
    private String number;

    @NotNull
    @Column(name="valid_from")
    private Date validFrom;

    @NotNull
    @Column(name="good_thru")
    private Date goodThru;

    @NotNull
    @Column(name="pin_hash")
    private String pinHash;

    @NotNull
    @Column(name="balance")
    private BigDecimal balance;

    @NotNull
    @Column(name="status")
    private Boolean status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    @NotNull
    private Users users;

    @OneToMany(mappedBy = "cards", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Transactions> transactionsList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(Date validFrom) {
        this.validFrom = validFrom;
    }

    public Date getGoodThru() {
        return goodThru;
    }

    public void setGoodThru(Date goodThru) {
        this.goodThru = goodThru;
    }

    public String getPinHash() {
        return pinHash;
    }

    public void setPinHash(String pinHash) {
        this.pinHash = pinHash;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Cards(){

    }
    public Cards(String number, String pinHash){
        this.setNumber(number);
        this.setPinHash(pinHash);
    }
}
