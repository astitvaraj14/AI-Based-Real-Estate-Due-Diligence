package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class FloodZoneResponse {

    private String ZoneType;
    private String RiskLevel;
    private String InsuranceRequired;
    private String Authority;


}

