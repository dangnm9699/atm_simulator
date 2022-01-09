package it5005.atm_simulator.atm_bank.models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@Entity
@Table(name = "transactions")
@Data
public class Transaction implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="amount")
    private BigDecimal amount;

    @NotNull
    @Column(name="created_at")
    private Date created_at;

    @NotNull
    @Column(name="description")
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToOne
    @JoinColumn(name="card_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @NotNull
    private Card card;

    public Card getCard() {
        return card;
    }

    public void setCards(Card card) {
        this.card = card;
    }

    @ManyToOne
    @JoinColumn(name="atm_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @NotNull
    private Atm atm;

    public Atm getAtm() {
        return atm;
    }

    public void setAtm(Atm atm) {
        this.atm = atm;
    }

}
