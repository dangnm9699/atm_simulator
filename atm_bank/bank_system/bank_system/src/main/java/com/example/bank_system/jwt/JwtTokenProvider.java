package com.example.bank_system.jwt;

import com.example.bank_system.model.Cards;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private final String JWT_SECRET = "dat";

    // Thoi gian co hieu luc cua chuoi jwt
    private final long JWT_EXPIRATION = 6048000000L;

    // Tao ra jwt tu thong tin user
    public String generateToken(Cards cards){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        // Tao chuoi json web token tu id cua user
        return Jwts.builder()
                        .setSubject(Long.toString(cards.getId()))
                        .setIssuedAt(now)
                        .setExpiration(expiryDate)
                        .signWith(SignatureAlgorithm.HS512,JWT_SECRET)
                                .compact();
    }

    // Lay thong tin user tu jwt
    public Long getCardIdFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken){
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        }catch (MalformedJwtException ex){
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex){
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex){
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex){
            log.error("JWT claims string is empty");
        }
        return false;
    }
}
