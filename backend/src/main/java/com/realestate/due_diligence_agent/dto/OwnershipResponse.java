
package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Mock response returned by the Ownership Record service.
 * Replace with a real external ownership API later.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnershipResponse {

    private String ownerName;
    private boolean ownerVerified;
    private String ownershipType;
    private String ownershipSince;
    private String remarks;
}
