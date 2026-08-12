package com.realestate.due_diligence_agent.controller;

import com.realestate.due_diligence_agent.entity.AuditLog;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.AuditLogRepository;
import com.realestate.due_diligence_agent.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;
    private final UserService userService;

    public AuditLogController(AuditLogRepository auditLogRepository, UserService userService) {
        this.auditLogRepository = auditLogRepository;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<AuditLog>> getUserAuditLogs() {
        User user = userService.getLoggedInUser();
        List<AuditLog> logs;
        if (user.getRole() == com.realestate.due_diligence_agent.entity.Role.ADMIN) {
            logs = auditLogRepository.findAll();
        } else {
            logs = auditLogRepository.findByUserId(user.getId());
        }
        
        // Sort by actionTime descending
        logs.sort((a, b) -> b.getActionTime().compareTo(a.getActionTime()));
        
        return ResponseEntity.ok(logs);
    }
}
