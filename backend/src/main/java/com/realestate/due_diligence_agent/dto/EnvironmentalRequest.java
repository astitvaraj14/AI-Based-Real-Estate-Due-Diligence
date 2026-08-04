package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Seller-submitted Environmental section of the Add/Edit Property form.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnvironmentalRequest {

    private String environmentalRisk;
    private String pollutionLevel;
    private String protectedArea;
    private String remarks;
}