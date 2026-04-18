package com.SmartInventoryManagement.System.service;

import com.SmartInventoryManagement.System.dto.*;

import com.SmartInventoryManagement.System.model.User;
import com.SmartInventoryManagement.System.repo.UserRepo;
import com.SmartInventoryManagement.System.security.JwtUtility;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final JwtUtility jwtUtil;
    private final PasswordEncoder passwordEncoder;

    private static final String SYSTEM_PASSKEY = "PHARMA2026";

    public String register(RegisterRequest request) {

        if (!SYSTEM_PASSKEY.equals(request.getPasskey())) {
            throw new RuntimeException("Invalid passkey");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);

        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getEmail());
    }
}