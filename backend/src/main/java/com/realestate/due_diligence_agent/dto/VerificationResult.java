package com.realestate.due_diligence_agent.dto;

import java.util.List;

public class VerificationResult {

    private Double score;
    private String status;
    private List<String> issues;

    public VerificationResult() {
    }

    public VerificationResult(Double score, String status, List<String> issues) {
        this.score = score;
        this.status = status;
        this.issues = issues;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getIssues() {
        return issues;
    }

    public void setIssues(List<String> issues) {
        this.issues = issues;
    }
}
