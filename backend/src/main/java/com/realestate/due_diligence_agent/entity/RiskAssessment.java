package com.realestate.due_diligence_agent.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "risk_assessment")
public class RiskAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long propertyId;

    private int legalRisk;
    private int environmentalRisk;
    private int crimeRisk;
    private int marketRisk;
    private int infrastructureRisk;
    private int documentationRisk;

    private int totalScore;

    private String riskLevel;

    @Column(length = 500)
    private String recommendation;

    public RiskAssessment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public int getLegalRisk() {
        return legalRisk;
    }

    public void setLegalRisk(int legalRisk) {
        this.legalRisk = legalRisk;
    }

    public int getEnvironmentalRisk() {
        return environmentalRisk;
    }

    public void setEnvironmentalRisk(int environmentalRisk) {
        this.environmentalRisk = environmentalRisk;
    }

    public int getCrimeRisk() {
        return crimeRisk;
    }

    public void setCrimeRisk(int crimeRisk) {
        this.crimeRisk = crimeRisk;
    }

    public int getMarketRisk() {
        return marketRisk;
    }

    public void setMarketRisk(int marketRisk) {
        this.marketRisk = marketRisk;
    }

    public int getInfrastructureRisk() {
        return infrastructureRisk;
    }

    public void setInfrastructureRisk(int infrastructureRisk) {
        this.infrastructureRisk = infrastructureRisk;
    }

    public int getDocumentationRisk() {
        return documentationRisk;
    }

    public void setDocumentationRisk(int documentationRisk) {
        this.documentationRisk = documentationRisk;
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