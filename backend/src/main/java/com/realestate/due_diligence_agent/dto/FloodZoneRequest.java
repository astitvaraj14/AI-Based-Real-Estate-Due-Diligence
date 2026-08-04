package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Seller-submitted Flood Zone section of the Add/Edit Property form.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FloodZoneRequest {

    private String zoneType;
    private String riskLevel;
    private String insuranceRequired;
    private String authority;
}