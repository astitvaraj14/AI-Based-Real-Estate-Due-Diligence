package com.realestate.due_diligence_agent.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.realestate.due_diligence_agent.dto.PropertyDetailsResponse;
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

    @PostMapping
    public Property addProperty(@RequestBody PropertyRequest request) {
        return propertyService.addProperty(request);
    }

    @PostMapping("/{id}/verify")
    public VerificationResult verifyProperty(@PathVariable Long id) {
        return propertyService.verifyProperty(id);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id,
                                   @RequestBody PropertyRequest request) {
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
}
