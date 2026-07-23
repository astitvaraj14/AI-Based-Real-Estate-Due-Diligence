
package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.OwnershipResponse;
import com.realestate.due_diligence_agent.entity.Property;

/**
 * Mock Ownership Record integration.
 * Replace this with a real ownership records API in the future.
 */
@Service
public class OwnershipService {

    public OwnershipResponse getOwnershipDetails(Property property) {

        return new OwnershipResponse(
                property.getOwnerName(),
                true,
                "Freehold",
                "2018-06-15",
                "Ownership record verified successfully."
        );
    }
}
