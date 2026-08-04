package com.realestate.due_diligence_agent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.PermitRequest;
import com.realestate.due_diligence_agent.dto.PermitResponse;
import com.realestate.due_diligence_agent.entity.Permit;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.PermitRepository;

/**
 * Permit data, backed by PostgreSQL. Values come from what the seller enters
 * on Add/Edit Property — nothing here is generated.
 */
@Service
public class PermitService {

    private static final Logger log = LoggerFactory.getLogger(PermitService.class);

    private final PermitRepository permitRepository;

    public PermitService(PermitRepository permitRepository) {
        this.permitRepository = permitRepository;
    }

    public Permit buildFromRequest(PermitRequest request, Property property) {
        Permit permit = new Permit();
        permit.setProperty(property);
        applyRequest(permit, request);
        return permit;
    }

    public void applyRequest(Permit permit, PermitRequest request) {
        if (request == null) {
            return;
        }
        permit.setPermitNumber(request.getPermitNumber());
        permit.setPermitType(request.getPermitType());
        permit.setPermitStatus(request.getPermitStatus());
        permit.setIssuingAuthority(request.getIssuingAuthority());
    }

    // Stands in for a call out to an external permit-issuing-authority
    // service. Retried on transient failures with exponential backoff.
    @Retryable(
            retryFor = Exception.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 500, multiplier = 2))
    public PermitResponse getPermit(Property property) {
        Permit permit = property.getPermit();
        if (permit == null) {
            return null;
        }
        return new PermitResponse(
                permit.getPermitNumber(),
                permit.getPermitType(),
                permit.getPermitStatus(),
                permit.getIssuingAuthority()
        );
    }

    @Recover
    public PermitResponse recoverGetPermit(Exception ex, Property property) {
        log.warn("Permit lookup failed after retries for property {}: {}",
                property != null ? property.getId() : null, ex.getMessage());
        return null;
    }

    public PermitRepository getRepository() {
        return permitRepository;
    }
}