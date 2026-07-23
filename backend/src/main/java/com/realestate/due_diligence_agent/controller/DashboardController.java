package com.realestate.due_diligence_agent.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.DashboardResponse;
import com.realestate.due_diligence_agent.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // ===========================
    // Dashboard Statistics
    // ===========================
    @GetMapping
    public DashboardResponse getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}