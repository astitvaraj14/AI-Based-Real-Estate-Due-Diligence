package com.realestate.due_diligence_agent.controller;

import com.realestate.due_diligence_agent.dto.ValuationComparisonResponse;
import com.realestate.due_diligence_agent.service.ValuationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/valuation")
public class ValuationController {

    private final ValuationService valuationService;

    public ValuationController(ValuationService valuationService) {
        this.valuationService = valuationService;
    }

    @GetMapping("/{propertyId}")
    public ValuationComparisonResponse compareValuation(
            @PathVariable Long propertyId) {

        return valuationService.compareValuation(propertyId);
    }
}