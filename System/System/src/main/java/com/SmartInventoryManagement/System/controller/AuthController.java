package com.SmartInventoryManagement.System.controller;


import com.SmartInventoryManagement.System.dto.AuthResponse;
import com.SmartInventoryManagement.System.dto.LoginRequest;
import com.SmartInventoryManagement.System.dto.RegisterRequest;
import com.SmartInventoryManagement.System.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private final AuthService authService;

    @PostMapping("/registerPharamcist")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/loginPharamacist")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}