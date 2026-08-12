package com.realestate.due_diligence_agent.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.DashboardResponse;
import com.realestate.due_diligence_agent.dto.PropertySummaryResponse;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.Role;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.PropertyRepository;

@Service
public class DashboardService {

    private final PropertyRepository propertyRepository;

    public DashboardService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // ===========================
    // Logged In User
    // ===========================
    private User getLoggedInUser() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    // ===========================
    // Dashboard Statistics
    // ===========================
    public DashboardResponse getDashboardStats() {

        User user = getLoggedInUser();

        List<Property> properties = user.getRole() == Role.ADMIN ? propertyRepository.findAll() : propertyRepository.findByUser(user);

        long totalProperties = properties.size();

        long pendingReviews = properties.stream()
                .filter(property
                        -> property.getVerificationStatus() != null
                && property.getVerificationStatus().equalsIgnoreCase("Pending"))
                .count();

        long verifiedProperties = properties.stream()
                .filter(property
                        -> property.getVerificationStatus() != null
                && property.getVerificationStatus().equalsIgnoreCase("Verified"))
                .count();

        long rejectedProperties = properties.stream()
                .filter(property
                        -> property.getVerificationStatus() != null
                && property.getVerificationStatus().equalsIgnoreCase("Rejected"))
                .count();

        double averageVerificationScore = properties.stream()
                .map(Property::getVerificationScore)
                .filter(score -> score != null)
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);

        double totalPropertyValue = properties.stream()
                .map(Property::getPrice)
                .filter(price -> price != null)
                .mapToDouble(Double::doubleValue)
                .sum();

        // ===========================
        // Latest 5 Properties
        // ===========================
        List<PropertySummaryResponse> recentProperties = properties.stream()
                .sorted(
                        Comparator.comparing(
                                Property::getRegistrationDate,
                                Comparator.nullsLast(Comparator.reverseOrder())
                        )
                )
                .limit(5)
                .map(property -> new PropertySummaryResponse(
                property.getId(),
                property.getTitle(),
                property.getOwnerName(),
                property.getAddress(),
                property.getCity(),
                property.getState(),
                property.getPropertyType(),
                property.getArea(),
                property.getPrice(),
                property.getVerificationStatus(),
                property.getVerificationScore(),
                property.getRegistrationDate(),
                property.getVerificationDate()
        ))
                .toList();

        return new DashboardResponse(
                totalProperties,
                pendingReviews,
                verifiedProperties,
                rejectedProperties,
                averageVerificationScore,
                totalPropertyValue,
                recentProperties
        );
    }
}
