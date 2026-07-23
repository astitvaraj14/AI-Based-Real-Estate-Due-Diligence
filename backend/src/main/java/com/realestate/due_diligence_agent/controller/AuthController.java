package com.realestate.due_diligence_agent.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.AuthResponse;
import com.realestate.due_diligence_agent.dto.ChooseRoleRequest;
import com.realestate.due_diligence_agent.dto.ForgotPasswordRequest;
import com.realestate.due_diligence_agent.dto.GoogleLoginRequest;
import com.realestate.due_diligence_agent.dto.LoginRequest;
import com.realestate.due_diligence_agent.dto.MobileOtpRequest;
import com.realestate.due_diligence_agent.dto.MobileOtpVerifyRequest;
import com.realestate.due_diligence_agent.dto.RegisterRequest;
import com.realestate.due_diligence_agent.dto.ResetPasswordRequest;
import com.realestate.due_diligence_agent.dto.VerifyOtpRequest;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // =====================
    // Register
    // =====================

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(
            @RequestBody RegisterRequest request) {

        User savedUser = userService.register(request);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // =====================
    // Login
    // =====================

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {

        AuthResponse response = userService.login(request);

        return ResponseEntity.ok(response);
    }

    // =====================
    // Send Mobile OTP
    // =====================

    @PostMapping("/mobile/send-otp")
    public ResponseEntity<String> sendMobileOtp(
            @RequestBody MobileOtpRequest request) {

        userService.sendMobileOtp(request);

        return ResponseEntity.ok("OTP sent successfully.");
    }

    // =====================
    // Verify Mobile OTP
    // =====================

    @PostMapping("/mobile/verify-otp")
    public ResponseEntity<AuthResponse> verifyMobileOtp(
            @RequestBody MobileOtpVerifyRequest request) {

        AuthResponse response = userService.verifyMobileOtp(request);

        return ResponseEntity.ok(response);
    }

    // =====================
    // Google Login
    // =====================

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(
            @RequestBody GoogleLoginRequest request) throws Exception {

        AuthResponse response = userService.googleLogin(request);

        return ResponseEntity.ok(response);
    }

    // =====================
    // Select Role (Google Users)
    // =====================

    @PostMapping("/select-role")
    public ResponseEntity<AuthResponse> selectRole(
            @RequestBody ChooseRoleRequest request) {

        AuthResponse response = userService.selectRole(request);

        return ResponseEntity.ok(response);
    }

    // =====================
    // Forgot Password
    // =====================

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        userService.forgotPassword(request);

        return ResponseEntity.ok("OTP sent successfully.");
    }

    // =====================
    // Verify OTP
    // =====================

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        userService.verifyOtp(request);

        return ResponseEntity.ok("OTP verified.");
    }

    // =====================
    // Reset Password
    // =====================

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        userService.resetPassword(request);

        return ResponseEntity.ok("Password updated successfully.");
    }
}