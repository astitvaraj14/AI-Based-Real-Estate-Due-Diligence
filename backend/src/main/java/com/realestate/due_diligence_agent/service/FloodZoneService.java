package com.realestate.due_diligence_agent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.FloodZoneRequest;
import com.realestate.due_diligence_agent.dto.FloodZoneResponse;
import com.realestate.due_diligence_agent.entity.FloodZone;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.exception.ResourceNotFoundException;
import com.realestate.due_diligence_agent.repository.FloodZoneRepository;
import com.realestate.due_diligence_agent.repository.PropertyRepository;

/**
 * Flood zone data, backed by PostgreSQL. Values come from what the seller
 * enters on Add/Edit Property — nothing here is generated.
 */
@Service
public class FloodZoneService {

    private static final Logger log = LoggerFactory.getLogger(FloodZoneService.class);

    private final PropertyRepository propertyRepository;
    private final FloodZoneRepository floodZoneRepository;

    public FloodZoneService(PropertyRepository propertyRepository,
                             FloodZoneRepository floodZoneRepository) {
        this.propertyRepository = propertyRepository;
        this.floodZoneRepository = floodZoneRepository;
    }

    public FloodZone buildFromRequest(FloodZoneRequest request, Property property) {
        FloodZone floodZone = new FloodZone();
        floodZone.setProperty(property);
        applyRequest(floodZone, request);
        return floodZone;
    }

    public void applyRequest(FloodZone floodZone, FloodZoneRequest request) {
        if (request == null) {
            return;
        }
        floodZone.setZoneType(request.getZoneType());
        floodZone.setRiskLevel(request.getRiskLevel());
        floodZone.setInsuranceRequired(request.getInsuranceRequired());
        floodZone.setAuthority(request.getAuthority());
    }

    // Stands in for a call out to an external flood-zone-authority service.
    // Retried on transient failures with exponential backoff.
    @Retryable(
            retryFor = Exception.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 500, multiplier = 2))
    public FloodZoneResponse getFloodZone(Property property) {
        FloodZone floodZone = property.getFloodZone();
        if (floodZone == null) {
            return null;
        }
        return toResponse(floodZone);
    }

    @Recover
    public FloodZoneResponse recoverGetFloodZone(Exception ex, Property property) {
        log.warn("Flood zone lookup failed after retries for property {}: {}",
                property != null ? property.getId() : null, ex.getMessage());
        return null;
    }

    // Used directly by GET /api/properties/{id}/flood-zone (kept working for
    // the existing frontend api.js call), reading straight from PostgreSQL.
    // Retried on transient failures only; a genuine "property not found"
    // is a business error and is not retried.
    @Retryable(
            retryFor = Exception.class,
            noRetryFor = ResourceNotFoundException.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 500, multiplier = 2))
    public FloodZoneResponse getFloodZone(Long propertyId) {
        propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        return floodZoneRepository.findByPropertyId(propertyId)
                .map(this::toResponse)
                .orElse(null);
    }

    @Recover
    public FloodZoneResponse recoverGetFloodZoneById(Exception ex, Long propertyId) {
        log.warn("Flood zone lookup failed after retries for property id {}: {}", propertyId, ex.getMessage());
        return null;
    }

    private FloodZoneResponse toResponse(FloodZone floodZone) {
        return new FloodZoneResponse(
                floodZone.getZoneType(),
                floodZone.getRiskLevel(),
                floodZone.getInsuranceRequired(),
                floodZone.getAuthority()
        );
    }

    public FloodZoneRepository getRepository() {
        return floodZoneRepository;
    }
}