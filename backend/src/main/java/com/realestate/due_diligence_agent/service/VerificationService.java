package com.realestate.due_diligence_agent.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.VerificationResult;
import com.realestate.due_diligence_agent.entity.Property;

@Service
public class VerificationService {

    public VerificationResult verify(Property property) {

        double score = 0;
        List<String> issues = new ArrayList<>();

        // Address Verification
        if (property.getAddress() != null
                && !property.getAddress().isBlank()) {
            score += 20;
        } else {
            issues.add("Address is missing");
        }

        // Owner Verification
        if (property.getOwnerName() != null
                && !property.getOwnerName().isBlank()) {
            score += 20;
        } else {
            issues.add("Owner name is missing");
        }

        // Property Type
        if (property.getPropertyType() != null
                && !property.getPropertyType().isBlank()) {
            score += 20;
        } else {
            issues.add("Property type is missing");
        }

        // Price Check
        if (property.getPrice() != null
                && property.getPrice() > 0) {
            score += 20;
        } else {
            issues.add("Invalid property price");
        }

        // Area Check
        if (property.getArea() != null
                && property.getArea() > 0) {
            score += 20;
        } else {
            issues.add("Invalid property area");
        }

        String status;

        if (score >= 90) {
            status = "Verified";
        } else if (score >= 60) {
            status = "Needs Review";
        } else {
            status = "Rejected";
        }

        return new VerificationResult(score, status, issues);
    }
}
