package com.realestate.due_diligence_agent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.ChangePasswordRequest;
import com.realestate.due_diligence_agent.dto.ProfileResponse;
import com.realestate.due_diligence_agent.dto.UpdateProfileRequest;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ==========================
    // Get Logged In User Profile
    // ==========================
    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile() {

        User user = userService.getLoggedInUser();

        ProfileResponse response = new ProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                user.getPhone(),
                user.getJoinedDate()
        );

        return ResponseEntity.ok(response);
    }

    // ==========================
    // Update Profile
    // ==========================
    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            @RequestBody UpdateProfileRequest request) {

        User updatedUser = userService.updateProfile(request);

        ProfileResponse response = new ProfileResponse(
                updatedUser.getId(),
                updatedUser.getFullName(),
                updatedUser.getEmail(),
                updatedUser.getRole().name(),
                updatedUser.getPhone(),
                updatedUser.getJoinedDate()
        );

        return ResponseEntity.ok(response);
    }

    // ==========================
    // Change Password
    // ==========================
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully.");
    }
}
