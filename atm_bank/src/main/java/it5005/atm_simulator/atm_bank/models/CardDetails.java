/**
 * reference: https://kipalog.com/posts/Hu-o--ng-da--n-Spring-Security---JWT--Json-Web-Token----Hibernate?fbclid=IwAR03zWwyxuqhOQSqQLaCJDuqY_eQ6_RbpZ2JeSFCprXcrOP6mNdU5LQFlrQ
 */
package it5005.atm_simulator.atm_bank.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Collection;
import java.util.Collections;

@Data
@AllArgsConstructor
public class CardDetails implements UserDetails {
    Card card;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return card.getPinHash();
    }

    @Override
    public String getUsername() {
        return card.getNumber();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
