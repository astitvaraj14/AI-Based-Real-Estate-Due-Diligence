package com.realestate.due_diligence_agent.dto;

public class RiskAssessmentResponse {

    private Long propertyId;
    private int totalScore;
    private String riskLevel;
    private String recommendation;

    public RiskAssessmentResponse() {
    }

    public RiskAssessmentResponse(Long propertyId, int totalScore,
                                  String riskLevel, String recommendation) {
        this.propertyId = propertyId;
        this.totalScore = totalScore;
        this.riskLevel = riskLevel;
        this.recommendation = recommendation;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}