package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Seller-submitted Land Registry section of the Add/Edit Property form.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandRegistryRequest {

    private String registryNumber;
    private String registryStatus;
    private String registryOffice;
    private boolean titleVerified;
    private String lastUpdated;
}