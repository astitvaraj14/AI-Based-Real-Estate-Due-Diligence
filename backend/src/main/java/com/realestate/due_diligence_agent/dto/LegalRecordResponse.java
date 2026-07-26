package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LegalRecordResponse {

    private String CourtCases;

    private String CaseStatus;

    private String Remarks;

}
