package com.realestate.due_diligence_agent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.EnvironmentalRequest;
import com.realestate.due_diligence_agent.dto.EnvironmentalResponse;
import com.realestate.due_diligence_agent.entity.Environmental;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.EnvironmentalRepository;

/**
 * Environmental data, backed by PostgreSQL. Values come from what the seller
 * enters on Add/Edit Property — nothing here is generated.
 */
@Service
public class EnvironmentalService {

    private static final Logger log = LoggerFactory.getLogger(EnvironmentalService.class);

    private final EnvironmentalRepository environmentalRepository;

    public EnvironmentalService(EnvironmentalRepository environmentalRepository) {
        this.environmentalRepository = environmentalRepository;
    }

    public Environmental buildFromRequest(EnvironmentalRequest request, Property property) {
        Environmental environmental = new Environmental();
        environmental.setProperty(property);
        applyRequest(environmental, request);
        return environmental;
    }

    public void applyRequest(Environmental environmental, EnvironmentalRequest request) {
        if (request == null) {
            return;
        }
        environmental.setEnvironmentalRisk(request.getEnvironmentalRisk());
        environmental.setPollutionLevel(request.getPollutionLevel());
        environmental.setProtectedArea(request.getProtectedArea());
        environmental.setRemarks(request.getRemarks());
    }

    // Stands in for a call out to an external environmental-data service.
    // Retried on transient failures with exponential backoff.
    @Retryable(
            retryFor = Exception.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 500, multiplier = 2))
    public EnvironmentalResponse getEnvironmental(Property property) {
        Environmental environmental = property.getEnvironmental();
        if (environmental == null) {
            return null;
        }
        return new EnvironmentalResponse(
                environmental.getEnvironmentalRisk(),
                environmental.getPollutionLevel(),
                environmental.getProtectedArea(),
                environmental.getRemarks()
        );
    }

    @Recover
    public EnvironmentalResponse recoverGetEnvironmental(Exception ex, Property property) {
        log.warn("Environmental lookup failed after retries for property {}: {}",
                property != null ? property.getId() : null, ex.getMessage());
        return null;
    }

    public EnvironmentalRepository getRepository() {
        return environmentalRepository;
    }
}