package com.realestate.due_diligence_agent.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.AddressValidationResponse;
import com.realestate.due_diligence_agent.dto.PropertyRequest;
import com.realestate.due_diligence_agent.dto.VerificationResult;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.PropertyRepository;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final AddressValidationService addressValidationService;
    private final VerificationService verificationService;

    public PropertyService(PropertyRepository propertyRepository,
            AddressValidationService addressValidationService,
            VerificationService verificationService) {

        this.propertyRepository = propertyRepository;
        this.addressValidationService = addressValidationService;
        this.verificationService = verificationService;
    }

    // Returns the currently logged-in user
    private User getLoggedInUser() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    // =========================
    // Add Property
    // =========================
    public Property addProperty(PropertyRequest request) {

        System.out.println("========== REQUEST RECEIVED ==========");
        System.out.println("Title      : " + request.getTitle());
        System.out.println("Address    : '" + request.getAddress() + "'");
        System.out.println("City       : " + request.getCity());
        System.out.println("State      : " + request.getState());
        System.out.println("Owner Name : " + request.getOwnerName());
        System.out.println("Price      : " + request.getPrice());
        System.out.println("Area       : " + request.getArea());

        AddressValidationResponse validation
                = addressValidationService.validateAddress(request.getAddress());

        if (!validation.isValid()) {
            throw new RuntimeException(validation.getMessage());
        }

        User loggedInUser = getLoggedInUser();

        Property property = new Property();

        property.setTitle(request.getTitle());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPropertyType(request.getPropertyType());
        property.setPrice(request.getPrice());
        property.setArea(request.getArea());
        property.setOwnerName(request.getOwnerName());

        // Owner
        property.setUser(loggedInUser);

        // Verification Details
        property.setVerificationStatus("Pending");
        property.setVerificationScore(0.0);
        property.setRegistrationDate(LocalDate.now());
        property.setVerificationDate(null);

        System.out.println("========== ADD PROPERTY ==========");
        System.out.println("User : " + loggedInUser.getEmail());
        System.out.println("Status : " + property.getVerificationStatus());
        System.out.println("Score : " + property.getVerificationScore());
        System.out.println("Registration Date : " + property.getRegistrationDate());

        Property savedProperty = propertyRepository.save(property);

        System.out.println("Saved Property ID : " + savedProperty.getId());

        return savedProperty;
    }

    // =========================
    // Verify Property
    // =========================
    public VerificationResult verifyProperty(Long propertyId) {

        System.out.println("========== VERIFY SERVICE ==========");

        User loggedInUser = getLoggedInUser();

        System.out.println("Logged In User: " + loggedInUser.getEmail());

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        System.out.println("Property Found: " + property.getTitle());

        if (!property.getUser().getId().equals(loggedInUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        VerificationResult result = verificationService.verify(property);

        property.setVerificationScore(result.getScore());
        property.setVerificationStatus(result.getStatus());
        property.setVerificationDate(LocalDate.now());

        propertyRepository.save(property);

        System.out.println("Verification Completed");

        return result;
    }

    // =========================
    // Get All Properties
    // =========================
    public List<Property> getAllProperties() {
        return propertyRepository.findByUser(getLoggedInUser());
    }

    // =========================
    // Filter by City
    // =========================
    public List<Property> getPropertiesByCity(String city) {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .filter(property
                        -> property.getCity().equalsIgnoreCase(city))
                .toList();
    }

    // =========================
    // Filter by Property Type
    // =========================
    public List<Property> getPropertiesByType(String propertyType) {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .filter(property
                        -> property.getPropertyType().equalsIgnoreCase(propertyType))
                .toList();
    }

    // =========================
    // Filter by Price
    // =========================
    public List<Property> getPropertiesByPrice(Double minPrice,
            Double maxPrice) {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .filter(property
                        -> property.getPrice() >= minPrice
                && property.getPrice() <= maxPrice)
                .toList();
    }

    // =========================
    // Property Statistics
    // =========================
    public Map<String, Long> getPropertyTypeStats() {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .collect(Collectors.groupingBy(
                        Property::getPropertyType,
                        Collectors.counting()));
    }
}
