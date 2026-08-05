package com.realestate.due_diligence_agent.dto;

public class DueDiligenceReportResponse {

    // Property Details
    private Long propertyId;
    private String propertyTitle;
    private String ownerName;
    private String propertyType;
    private String address;
    private String city;
    private String state;
    private Double area;
    private Double price;

    // Ownership
    private Boolean ownerVerified;
    private String ownershipType;
    private String ownershipRemarks;

    // Legal
    private String courtCases;
    private String caseStatus;
    private String legalRemarks;

    // Flood
    private String floodRiskLevel;

    // Tax
    private String latestTaxStatus;

    // Zoning
    private String zoneType;
    private String constructionAllowed;

    // Risk Assessment
    private Integer totalRiskScore;
    private String riskLevel;
    private String recommendation;

    public DueDiligenceReportResponse() {
    }

    // ---------- Getters & Setters ----------

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public String getPropertyTitle() {
        return propertyTitle;
    }

    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getOwnerVerified() {
        return ownerVerified;
    }

    public void setOwnerVerified(Boolean ownerVerified) {
        this.ownerVerified = ownerVerified;
    }

    public String getOwnershipType() {
        return ownershipType;
    }

    public void setOwnershipType(String ownershipType) {
        this.ownershipType = ownershipType;
    }

    public String getOwnershipRemarks() {
        return ownershipRemarks;
    }

    public void setOwnershipRemarks(String ownershipRemarks) {
        this.ownershipRemarks = ownershipRemarks;
    }

    public String getCourtCases() {
        return courtCases;
    }

    public void setCourtCases(String courtCases) {
        this.courtCases = courtCases;
    }

    public String getCaseStatus() {
        return caseStatus;
    }

    public void setCaseStatus(String caseStatus) {
        this.caseStatus = caseStatus;
    }

    public String getLegalRemarks() {
        return legalRemarks;
    }

    public void setLegalRemarks(String legalRemarks) {
        this.legalRemarks = legalRemarks;
    }

    public String getFloodRiskLevel() {
        return floodRiskLevel;
    }

    public void setFloodRiskLevel(String floodRiskLevel) {
        this.floodRiskLevel = floodRiskLevel;
    }

    public String getLatestTaxStatus() {
        return latestTaxStatus;
    }

    public void setLatestTaxStatus(String latestTaxStatus) {
        this.latestTaxStatus = latestTaxStatus;
    }

    public String getZoneType() {
        return zoneType;
    }

    public void setZoneType(String zoneType) {
        this.zoneType = zoneType;
    }

    public String getConstructionAllowed() {
        return constructionAllowed;
    }

    public void setConstructionAllowed(String constructionAllowed) {
        this.constructionAllowed = constructionAllowed;
    }

    public Integer getTotalRiskScore() {
        return totalRiskScore;
    }

    public void setTotalRiskScore(Integer totalRiskScore) {
        this.totalRiskScore = totalRiskScore;
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