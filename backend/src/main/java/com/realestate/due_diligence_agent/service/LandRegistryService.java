
package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.LandRegistryResponse;
import com.realestate.due_diligence_agent.entity.Property;

/**
 * Mock Public Land Registry integration.
 * Replace this implementation with a real API call later.
 */
@Service
public class LandRegistryService {

    public LandRegistryResponse getRegistryDetails(Property property) {

        return new LandRegistryResponse(
                "REG-" + property.getId(),
                "ACTIVE",
                property.getCity() + " Land Registry Office",
                true,
                java.time.LocalDate.now().toString()
        );
    }
}
