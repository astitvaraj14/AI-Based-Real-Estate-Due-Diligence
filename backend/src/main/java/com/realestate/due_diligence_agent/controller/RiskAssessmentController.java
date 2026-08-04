package com.realestate.due_diligence_agent.controller;

import com.realestate.due_diligence_agent.dto.RiskAssessmentResponse;
import com.realestate.due_diligence_agent.service.RiskAssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/risk")
@CrossOrigin(origins = "*")
public class RiskAssessmentController {

    @Autowired
    private RiskAssessmentService service;

    @PostMapping("/{propertyId}")
    public RiskAssessmentResponse generateRiskAssessment(
            @PathVariable Long propertyId) {

        return service.generateRiskAssessment(propertyId);
    }

    @GetMapping("/{propertyId}")
    public RiskAssessmentResponse getRiskAssessment(
            @PathVariable Long propertyId) {

        return service.getRiskAssessment(propertyId);
    }
}