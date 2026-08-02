package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.ComparableAnalysisResponse;
import com.realestate.due_diligence_agent.dto.ComparablePropertyResponse;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComparablePropertyService {

    private final PropertyRepository propertyRepository;

    public ComparablePropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public ComparableAnalysisResponse analyzeComparableProperties(Long propertyId) {

        Property selectedProperty = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        List<Property> properties =
                propertyRepository.findByCityAndPropertyType(
                        selectedProperty.getCity(),
                        selectedProperty.getPropertyType()
                );

        properties = properties.stream()
            .filter(property ->
                    !property.getId().equals(selectedProperty.getId()))
            .toList();

        double minArea = selectedProperty.getArea() * 0.8;
        double maxArea = selectedProperty.getArea() * 1.2;

        properties = properties.stream()
                .filter(property ->
                        property.getArea() != null &&
                                property.getArea() >= minArea &&
                                property.getArea() <= maxArea)
                .toList();

        double averagePrice = properties.stream()
                .mapToDouble(Property::getPrice)
                .average()
                .orElse(0.0);

        double averagePricePerSqFt = properties.stream()
                .filter(property -> property.getArea() != null && property.getArea() > 0)
                .mapToDouble(property -> property.getPrice() / property.getArea())
                .average()
                .orElse(0.0);

        List<ComparablePropertyResponse> comparableList =
                properties.stream()
                        .map(property -> new ComparablePropertyResponse(
                                property.getId(),
                                property.getTitle(),
                                property.getCity(),
                                property.getPropertyType(),
                                property.getArea(),
                                property.getPrice(),
                                property.getPrice() / property.getArea()
                        ))
                        .collect(Collectors.toList());

        return new ComparableAnalysisResponse(
                selectedProperty.getId(),
                selectedProperty.getTitle(),
                selectedProperty.getPrice(),
                selectedProperty.getArea(),
                averagePrice,
                averagePricePerSqFt,
                comparableList.size(),
                comparableList
        );
    }


}