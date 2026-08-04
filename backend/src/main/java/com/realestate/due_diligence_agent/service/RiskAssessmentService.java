package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.RiskAssessmentResponse;

public interface RiskAssessmentService {

    RiskAssessmentResponse generateRiskAssessment(Long propertyId);

    RiskAssessmentResponse getRiskAssessment(Long propertyId);

}