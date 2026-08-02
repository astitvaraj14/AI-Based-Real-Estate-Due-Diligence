package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.ValuationComparisonResponse;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValuationService {

    private final PropertyRepository propertyRepository;

    public ValuationService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    public ValuationComparisonResponse compareValuation(Long propertyId) {

        Property selectedProperty = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        List<Property> comparableProperties =
                propertyRepository.findByCityAndPropertyType(
                        selectedProperty.getCity(),
                        selectedProperty.getPropertyType());

        comparableProperties = comparableProperties.stream()
                .filter(property ->
                        !property.getId().equals(selectedProperty.getId()))
                .toList();

        double minArea = selectedProperty.getArea() * 0.8;
        double maxArea = selectedProperty.getArea() * 1.2;

        comparableProperties = comparableProperties.stream()
                .filter(property ->
                        property.getArea() != null &&
                                property.getArea() >= minArea &&
                                property.getArea() <= maxArea)
                .toList();
        double estimatedMarketValue = comparableProperties.stream()
                .mapToDouble(Property::getPrice)
                .average()
                .orElse(0.0);
        double priceDifference =
                selectedProperty.getPrice() - estimatedMarketValue;
        double percentageDifference = 0.0;

        if (estimatedMarketValue > 0) {
            percentageDifference =
                    (priceDifference / estimatedMarketValue) * 100;
        }
        String valuationStatus;

        if (percentageDifference > 10) {
            valuationStatus = "OVERPRICED";
        }
        else if (percentageDifference < -10) {
            valuationStatus = "UNDERPRICED";
        }
        else {
            valuationStatus = "FAIRLY_PRICED";
        }

        if (comparableProperties.isEmpty()) {
            return new ValuationComparisonResponse(
                    selectedProperty.getId(),
                    selectedProperty.getTitle(),
                    selectedProperty.getPrice(),
                    0.0,
                    0.0,
                    0.0,
                    "NO_COMPARABLE_PROPERTIES_FOUND"
            );
        }
        return new ValuationComparisonResponse(
                selectedProperty.getId(),
                selectedProperty.getTitle(),
                selectedProperty.getPrice(),
                estimatedMarketValue,
                priceDifference,
                percentageDifference,
                valuationStatus
        );
    }

}