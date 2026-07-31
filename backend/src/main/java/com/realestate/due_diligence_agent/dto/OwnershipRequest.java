package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnershipRequest {

    private String ownerName;
    private Boolean ownerVerified;
    private String ownershipType;
    private String ownershipSince;
    private String remarks;
}