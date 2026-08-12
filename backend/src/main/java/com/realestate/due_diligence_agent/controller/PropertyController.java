package com.realestate.due_diligence_agent.controller;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.realestate.due_diligence_agent.dto.PropertyDetailsResponse;
import com.realestate.due_diligence_agent.dto.PropertyRequest;
import com.realestate.due_diligence_agent.dto.VerificationResult;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.service.PropertyService;
import com.realestate.due_diligence_agent.dto.FloodZoneResponse;
import com.realestate.due_diligence_agent.service.FloodZoneService;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final FloodZoneService floodZoneService;

    public PropertyController(PropertyService propertyService,
                          FloodZoneService floodZoneService) {
    this.propertyService = propertyService;
    this.floodZoneService = floodZoneService;
}

    @PostMapping
    public Property addProperty(@Valid @RequestBody PropertyRequest request) {
        return propertyService.addProperty(request);
    }

    @PostMapping("/{id}/verify")
    public VerificationResult verifyProperty(@PathVariable Long id) {
        return propertyService.verifyProperty(id);
    }

    @PutMapping("/{id}/status")
    public Property updatePropertyStatus(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        return propertyService.updatePropertyStatus(id, request);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id,
                                   @Valid @RequestBody PropertyRequest request) {
        return propertyService.updateProperty(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return "Property deleted successfully.";
    }

    @GetMapping("/city/{city}")
    public List<Property> getByCity(@PathVariable String city) {
        return propertyService.getPropertiesByCity(city);
    }

    @GetMapping("/type/{type}")
    public List<Property> getByType(@PathVariable String type) {
        return propertyService.getPropertiesByType(type);
    }

    @GetMapping("/price")
    public List<Property> getByPrice(@RequestParam Double min,
                                     @RequestParam Double max) {
        return propertyService.getPropertiesByPrice(min, max);
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return propertyService.getPropertyTypeStats();
    }

    @GetMapping("/{id}")
    public PropertyDetailsResponse getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyDetailsById(id);
    }
    @GetMapping("/{id}/flood-zone")
    public FloodZoneResponse getFloodZone(@PathVariable Long id) {
    return floodZoneService.getFloodZone(id);
}
}