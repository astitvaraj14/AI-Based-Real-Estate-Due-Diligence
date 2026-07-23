
package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Mock response returned by the Public Land Registry service.
 * This can later be replaced with a real Government API response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LandRegistryResponse {

    private String registryNumber;
    private String registryStatus;
    private String registryOffice;
    private boolean titleVerified;
    private String lastUpdated;
}
