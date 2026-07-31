package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class FloodZoneRequest {
    private String zoneType;
    private String riskLevel;
    private String insuranceRequired;
    private String authority;
}
