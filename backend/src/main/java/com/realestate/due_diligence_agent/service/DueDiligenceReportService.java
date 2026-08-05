package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.DueDiligenceReportResponse;

public interface DueDiligenceReportService {

    DueDiligenceReportResponse generateReport(Long propertyId);

}