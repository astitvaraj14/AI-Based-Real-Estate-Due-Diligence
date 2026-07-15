package com.realestate.due_diligence_agent.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.AuthResponse;
import com.realestate.due_diligence_agent.dto.LoginRequest;
import com.realestate.due_diligence_agent.dto.RegisterRequest;
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

        String message = userService.login(request);

        return ResponseEntity.ok(new AuthResponse(message));
    }
}
