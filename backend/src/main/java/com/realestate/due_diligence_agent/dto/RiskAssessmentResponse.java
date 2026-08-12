package com.realestate.due_diligence_agent.dto;

public class RiskAssessmentResponse {

    private Long propertyId;
    private int totalScore;
    private String riskLevel;
    private String recommendation;
    
    // Breakdown fields
    private int legalRisk;
    private int documentationRisk;
    private int crimeRisk;
    private int environmentalRisk;
    private int marketRisk;
    private int infrastructureRisk;

    public RiskAssessmentResponse() {
    }

    public RiskAssessmentResponse(Long propertyId, int totalScore,
                                  String riskLevel, String recommendation,
                                  int legalRisk, int documentationRisk,
                                  int crimeRisk, int environmentalRisk,
                                  int marketRisk, int infrastructureRisk) {
        this.propertyId = propertyId;
        this.totalScore = totalScore;
        this.riskLevel = riskLevel;
        this.recommendation = recommendation;
        this.legalRisk = legalRisk;
        this.documentationRisk = documentationRisk;
        this.crimeRisk = crimeRisk;
        this.environmentalRisk = environmentalRisk;
        this.marketRisk = marketRisk;
        this.infrastructureRisk = infrastructureRisk;
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

    public int getLegalRisk() { return legalRisk; }
    public void setLegalRisk(int legalRisk) { this.legalRisk = legalRisk; }

    public int getDocumentationRisk() { return documentationRisk; }
    public void setDocumentationRisk(int documentationRisk) { this.documentationRisk = documentationRisk; }

    public int getCrimeRisk() { return crimeRisk; }
    public void setCrimeRisk(int crimeRisk) { this.crimeRisk = crimeRisk; }

    public int getEnvironmentalRisk() { return environmentalRisk; }
    public void setEnvironmentalRisk(int environmentalRisk) { this.environmentalRisk = environmentalRisk; }

    public int getMarketRisk() { return marketRisk; }
    public void setMarketRisk(int marketRisk) { this.marketRisk = marketRisk; }

    public int getInfrastructureRisk() { return infrastructureRisk; }
    public void setInfrastructureRisk(int infrastructureRisk) { this.infrastructureRisk = infrastructureRisk; }
}