package com.realestate.due_diligence_agent.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {

    private final UserService userService;

    public RoleController(UserService userService) {
        this.userService = userService;
    }

    // =====================
    // Select Role
    // =====================

    // @PostMapping("/select-role")
    // public ResponseEntity<AuthResponse> selectRole(
    //         @RequestBody ChooseRoleRequest request) throws Exception {

    //     AuthResponse response = userService.selectRole(request);

    //     return ResponseEntity.ok(response);
    // }
}