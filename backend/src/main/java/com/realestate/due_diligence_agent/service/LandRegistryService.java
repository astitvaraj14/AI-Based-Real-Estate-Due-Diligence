package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.LandRegistryRequest;
import com.realestate.due_diligence_agent.dto.LandRegistryResponse;
import com.realestate.due_diligence_agent.entity.LandRegistry;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.LandRegistryRepository;

/**
 * Public Land Registry data, backed by PostgreSQL. Values come from what the
 * seller enters on Add/Edit Property — nothing here is generated.
 */
@Service
public class LandRegistryService {

    private final LandRegistryRepository landRegistryRepository;

    public LandRegistryService(LandRegistryRepository landRegistryRepository) {
        this.landRegistryRepository = landRegistryRepository;
    }

    // Builds a new LandRegistry row linked to the given property. Persistence
    // happens when the owning Property is saved (cascade = ALL).
    public LandRegistry buildFromRequest(LandRegistryRequest request, Property property) {
        LandRegistry landRegistry = new LandRegistry();
        landRegistry.setProperty(property);
        applyRequest(landRegistry, request);
        return landRegistry;
    }

    // Applies request values onto an existing row in place, so edits update
    // the existing record instead of inserting a duplicate.
    public void applyRequest(LandRegistry landRegistry, LandRegistryRequest request) {
        if (request == null) {
            return;
        }
        landRegistry.setRegistryNumber(request.getRegistryNumber());
        landRegistry.setRegistryStatus(request.getRegistryStatus());
        landRegistry.setRegistryOffice(request.getRegistryOffice());
        landRegistry.setTitleVerified(request.isTitleVerified());
        landRegistry.setLastUpdated(request.getLastUpdated());
    }

    public LandRegistryResponse getRegistryDetails(Property property) {
        LandRegistry landRegistry = property.getLandRegistry();
        if (landRegistry == null) {
            return null;
        }
        return new LandRegistryResponse(
                landRegistry.getRegistryNumber(),
                landRegistry.getRegistryStatus(),
                landRegistry.getRegistryOffice(),
                landRegistry.isTitleVerified(),
                landRegistry.getLastUpdated()
        );
    }

    public LandRegistryRepository getRepository() {
        return landRegistryRepository;
    }
}