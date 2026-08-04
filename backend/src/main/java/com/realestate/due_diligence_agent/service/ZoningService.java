package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.ZoningRequest;
import com.realestate.due_diligence_agent.dto.ZoningResponse;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.Zoning;
import com.realestate.due_diligence_agent.repository.ZoningRepository;

/**
 * Zoning data, backed by PostgreSQL. Values come from what the seller enters
 * on Add/Edit Property — nothing here is generated.
 */
@Service
public class ZoningService {

    private final ZoningRepository zoningRepository;

    public ZoningService(ZoningRepository zoningRepository) {
        this.zoningRepository = zoningRepository;
    }

    public Zoning buildFromRequest(ZoningRequest request, Property property) {
        Zoning zoning = new Zoning();
        zoning.setProperty(property);
        applyRequest(zoning, request);
        return zoning;
    }

    public void applyRequest(Zoning zoning, ZoningRequest request) {
        if (request == null) {
            return;
        }
        zoning.setZoneType(request.getZoneType());
        zoning.setConstructionAllowed(request.getConstructionAllowed());
        zoning.setAuthority(request.getAuthority());
    }

    public ZoningResponse getZoning(Property property) {
        Zoning zoning = property.getZoning();
        if (zoning == null) {
            return null;
        }
        return new ZoningResponse(
                zoning.getZoneType(),
                zoning.getConstructionAllowed(),
                zoning.getAuthority()
        );
    }

    public ZoningRepository getRepository() {
        return zoningRepository;
    }
}