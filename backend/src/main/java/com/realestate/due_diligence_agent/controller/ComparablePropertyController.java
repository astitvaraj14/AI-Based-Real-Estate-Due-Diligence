package com.realestate.due_diligence_agent.controller;

import com.realestate.due_diligence_agent.dto.ComparableAnalysisResponse;
import com.realestate.due_diligence_agent.service.ComparablePropertyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comparable")
public class ComparablePropertyController {

    private final ComparablePropertyService comparablePropertyService;

    public ComparablePropertyController(
            ComparablePropertyService comparablePropertyService) {

        this.comparablePropertyService = comparablePropertyService;
    }

    @GetMapping("/{propertyId}")
    public ComparableAnalysisResponse getComparableProperties(
            @PathVariable Long propertyId) {

        return comparablePropertyService
                .analyzeComparableProperties(propertyId);
    }
}