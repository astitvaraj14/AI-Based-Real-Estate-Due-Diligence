package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnvironmentalResponse {

    private String environmentalRisk;
    private String pollutionLevel;
    private String protectedArea;
    private String remarks;
}