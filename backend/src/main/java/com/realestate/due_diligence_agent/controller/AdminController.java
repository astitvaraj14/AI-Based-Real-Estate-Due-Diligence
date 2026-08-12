package com.realestate.due_diligence_agent.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.entity.Role;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.UserRepository;
import com.realestate.due_diligence_agent.repository.PropertyRepository;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    public AdminController(UserRepository userRepository, PropertyRepository propertyRepository) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        long totalUsers = userRepository.count();
        List<Property> properties = propertyRepository.findAll();
        
        long totalProperties = properties.size();
        long verifiedProperties = properties.stream().filter(p -> "Verified".equalsIgnoreCase(p.getVerificationStatus())).count();
        long pendingProperties = properties.stream().filter(p -> "Pending".equalsIgnoreCase(p.getVerificationStatus())).count();
        double totalValue = properties.stream().mapToDouble(p -> p.getPrice() != null ? p.getPrice() : 0).sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalProperties", totalProperties);
        stats.put("verifiedProperties", verifiedProperties);
        stats.put("pendingProperties", pendingProperties);
        stats.put("totalValue", totalValue);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        try {
            Role newRole = Role.valueOf(request.get("role"));
            user.setRole(newRole);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role");
        }
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        Boolean isActive = request.get("isActive");
        if (isActive != null) {
            user.setActive(isActive);
            userRepository.save(user);
        }
        return ResponseEntity.ok(user);
    }
}
