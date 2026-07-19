package com.realestate.due_diligence_agent.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.PropertyRequest;
import com.realestate.due_diligence_agent.dto.VerificationResult;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.service.PropertyService;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    // ==========================
    // Add Property
    // ==========================
    @PostMapping
    public Property addProperty(@RequestBody PropertyRequest request) {
        return propertyService.addProperty(request);
    }

    // ==========================
    // Verify Property
    // ==========================
    @PostMapping("/{id}/verify")
    public VerificationResult verifyProperty(@PathVariable Long id) {

        System.out.println("========== VERIFY ENDPOINT ==========");
        System.out.println("Property ID: " + id);

        return propertyService.verifyProperty(id);
    }

    // ==========================
    // Get All Properties
    // ==========================
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // ==========================
    // Filter by City
    // ==========================
    @GetMapping("/city/{city}")
    public List<Property> getByCity(@PathVariable String city) {
        return propertyService.getPropertiesByCity(city);
    }

    // ==========================
    // Filter by Type
    // ==========================
    @GetMapping("/type/{type}")
    public List<Property> getByType(@PathVariable String type) {
        return propertyService.getPropertiesByType(type);
    }

    // ==========================
    // Filter by Price
    // ==========================
    @GetMapping("/price")
    public List<Property> getByPrice(
            @RequestParam Double min,
            @RequestParam Double max) {

        return propertyService.getPropertiesByPrice(min, max);
    }

    // ==========================
    // Property Statistics
    // ==========================
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return propertyService.getPropertyTypeStats();
    }
}
