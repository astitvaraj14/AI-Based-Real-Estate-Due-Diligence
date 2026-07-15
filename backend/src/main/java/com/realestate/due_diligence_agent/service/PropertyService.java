package com.realestate.due_diligence_agent.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.PropertyRequest;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.PropertyRepository;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final AddressValidationService addressValidationService;

    public PropertyService(PropertyRepository propertyRepository,
            AddressValidationService addressValidationService) {

        this.propertyRepository = propertyRepository;
        this.addressValidationService = addressValidationService;
    }

    public Property addProperty(PropertyRequest request) {

        var validation
                = addressValidationService.validateAddress(request.getAddress());

        if (!validation.isValid()) {
            throw new RuntimeException(validation.getMessage());
        }

        Property property = new Property();

        property.setTitle(request.getTitle());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPropertyType(request.getPropertyType());
        property.setPrice(request.getPrice());
        property.setArea(request.getArea());
        property.setOwnerName(request.getOwnerName());

        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getPropertiesByCity(String city) {
        return propertyRepository.findByCity(city);
    }

    public List<Property> getPropertiesByType(String propertyType) {
        return propertyRepository.findByPropertyType(propertyType);
    }

    public List<Property> getPropertiesByPrice(Double minPrice, Double maxPrice) {
        return propertyRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public Map<String, Long> getPropertyTypeStats() {

        List<Property> properties = propertyRepository.findAll();

        return properties.stream()
                .collect(Collectors.groupingBy(
                        Property::getPropertyType,
                        Collectors.counting()
                ));
    }
}
