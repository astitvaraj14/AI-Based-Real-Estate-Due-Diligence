package com.realestate.due_diligence_agent.dto;

import java.util.List;

public class DashboardResponse {

    private Long totalProperties;
    private Long pendingReviews;
    private Long verifiedProperties;
    private Long rejectedProperties;

    private Double averageVerificationScore;
    private Double totalPropertyValue;

    private List<PropertySummaryResponse> recentProperties;

    public DashboardResponse() {
    }

    public DashboardResponse(
            Long totalProperties,
            Long pendingReviews,
            Long verifiedProperties,
            Long rejectedProperties,
            Double averageVerificationScore,
            Double totalPropertyValue,
            List<PropertySummaryResponse> recentProperties) {

        this.totalProperties = totalProperties;
        this.pendingReviews = pendingReviews;
        this.verifiedProperties = verifiedProperties;
        this.rejectedProperties = rejectedProperties;
        this.averageVerificationScore = averageVerificationScore;
        this.totalPropertyValue = totalPropertyValue;
        this.recentProperties = recentProperties;
    }

    public Long getTotalProperties() {
        return totalProperties;
    }

    public void setTotalProperties(Long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public Long getPendingReviews() {
        return pendingReviews;
    }

    public void setPendingReviews(Long pendingReviews) {
        this.pendingReviews = pendingReviews;
    }

    public Long getVerifiedProperties() {
        return verifiedProperties;
    }

    public void setVerifiedProperties(Long verifiedProperties) {
        this.verifiedProperties = verifiedProperties;
    }

    public Long getRejectedProperties() {
        return rejectedProperties;
    }

    public void setRejectedProperties(Long rejectedProperties) {
        this.rejectedProperties = rejectedProperties;
    }

    public Double getAverageVerificationScore() {
        return averageVerificationScore;
    }

    public void setAverageVerificationScore(Double averageVerificationScore) {
        this.averageVerificationScore = averageVerificationScore;
    }

    public Double getTotalPropertyValue() {
        return totalPropertyValue;
    }

    public void setTotalPropertyValue(Double totalPropertyValue) {
        this.totalPropertyValue = totalPropertyValue;
    }

    public List<PropertySummaryResponse> getRecentProperties() {
        return recentProperties;
    }

    public void setRecentProperties(List<PropertySummaryResponse> recentProperties) {
        this.recentProperties = recentProperties;
    }
}
