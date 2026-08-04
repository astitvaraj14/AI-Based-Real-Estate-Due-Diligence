package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.OwnershipRequest;
import com.realestate.due_diligence_agent.dto.OwnershipResponse;
import com.realestate.due_diligence_agent.entity.Ownership;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.OwnershipRepository;

/**
 * Ownership record data, backed by PostgreSQL. Values come from what the
 * seller enters on Add/Edit Property — nothing here is generated.
 */
@Service
public class OwnershipService {

    private final OwnershipRepository ownershipRepository;

    public OwnershipService(OwnershipRepository ownershipRepository) {
        this.ownershipRepository = ownershipRepository;
    }

    public Ownership buildFromRequest(OwnershipRequest request, Property property) {
        Ownership ownership = new Ownership();
        ownership.setProperty(property);
        applyRequest(ownership, request);
        return ownership;
    }

    public void applyRequest(Ownership ownership, OwnershipRequest request) {
        if (request == null) {
            return;
        }
        ownership.setOwnershipType(request.getOwnershipType());
        ownership.setOwnershipSince(request.getOwnershipSince());
        ownership.setOwnerVerified(request.isOwnerVerified());
        ownership.setRemarks(request.getRemarks());
    }

    public OwnershipResponse getOwnershipDetails(Property property) {
        Ownership ownership = property.getOwnership();
        if (ownership == null) {
            return null;
        }
        return new OwnershipResponse(
                property.getOwnerName(),
                ownership.isOwnerVerified(),
                ownership.getOwnershipType(),
                ownership.getOwnershipSince(),
                ownership.getRemarks()
        );
    }

    public OwnershipRepository getRepository() {
        return ownershipRepository;
    }
}