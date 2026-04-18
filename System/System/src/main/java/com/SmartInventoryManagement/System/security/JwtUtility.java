package com.SmartInventoryManagement.System.security;


import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;





import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;


import java.security.Key;

@Component
public class JwtUtility {

    private final String SECRET = "mysecretkeymysecretkeymysecretkey12";
    // MUST be at least 32 chars for HS256

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}