package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermitResponse {

    private String permitNumber;
    private String permitType;
    private String permitStatus;
    private String issuingAuthority;
}