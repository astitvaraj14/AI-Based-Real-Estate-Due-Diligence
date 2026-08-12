package com.realestate.due_diligence_agent.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.realestate.due_diligence_agent.dto.AuthResponse;
import com.realestate.due_diligence_agent.dto.ForgotPasswordRequest;
import com.realestate.due_diligence_agent.dto.GoogleAuthRequest;
import com.realestate.due_diligence_agent.dto.LoginRequest;
import com.realestate.due_diligence_agent.dto.RegisterRequest;
import com.realestate.due_diligence_agent.dto.ResetPasswordRequest;
import com.realestate.due_diligence_agent.dto.VerifyOtpRequest;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest request) {
        User savedUser = userService.register(request);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        System.out.println("========== LOGIN REQUEST ==========");
        System.out.println("Email = " + request.getEmail());

        AuthResponse response = userService.login(request);

        System.out.println("========== TOKEN ==========");
        System.out.println(response.getToken());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {
        AuthResponse response = userService.googleLogin(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    userService.forgotPassword(request);
    return ResponseEntity.ok("OTP sent successfully.");
}

@PostMapping("/verify-otp")
public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest request) {
    userService.verifyOtp(request);
    return ResponseEntity.ok("OTP verified successfully.");
}

@PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
    userService.resetPassword(request);
    return ResponseEntity.ok("Password reset successfully.");
}
}