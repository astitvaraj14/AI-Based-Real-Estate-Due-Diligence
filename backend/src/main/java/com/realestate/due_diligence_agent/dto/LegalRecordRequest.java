package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LegalRecordRequest {

    private String courtCases;
    private String caseStatus;
    private String remarks;
}