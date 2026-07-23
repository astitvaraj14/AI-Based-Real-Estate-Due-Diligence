package com.realestate.due_diligence_agent.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.realestate.due_diligence_agent.entity.PropertyTaxHistory;
import com.realestate.due_diligence_agent.service.PropertyTaxHistoryService;

@RestController
@RequestMapping("/api/tax-history")
public class PropertyTaxHistoryController {

    private final PropertyTaxHistoryService propertyTaxHistoryService;

    public PropertyTaxHistoryController(PropertyTaxHistoryService propertyTaxHistoryService) {
        this.propertyTaxHistoryService = propertyTaxHistoryService;
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<PropertyTaxHistory>> getTaxHistory(
            @PathVariable Long propertyId) {

        return ResponseEntity.ok(
                propertyTaxHistoryService.getTaxHistoryByPropertyId(propertyId));
    }

    @PostMapping("/property/{propertyId}")
    public ResponseEntity<PropertyTaxHistory> addTaxHistory(
            @PathVariable Long propertyId,
            @RequestBody PropertyTaxHistory taxHistory) {

        return ResponseEntity.ok(
                propertyTaxHistoryService.addTaxHistory(propertyId, taxHistory));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyTaxHistory> updateTaxHistory(
            @PathVariable Long id,
            @RequestBody PropertyTaxHistory taxHistory) {

        return ResponseEntity.ok(
                propertyTaxHistoryService.updateTaxHistory(id, taxHistory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTaxHistory(@PathVariable Long id) {

        propertyTaxHistoryService.deleteTaxHistory(id);

        return ResponseEntity.ok("Tax history deleted successfully.");
    }
}