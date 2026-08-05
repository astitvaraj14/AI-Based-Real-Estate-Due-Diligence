package com.realestate.due_diligence_agent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.DueDiligenceReportResponse;
import com.realestate.due_diligence_agent.entity.DueDiligenceReport;
import com.realestate.due_diligence_agent.repository.DueDiligenceReportRepository;
import com.realestate.due_diligence_agent.service.DueDiligenceReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class DueDiligenceReportController {

    @Autowired
    private DueDiligenceReportService dueDiligenceReportService;

    @Autowired
    private DueDiligenceReportRepository dueDiligenceReportRepository;

    /**
     * Generate Complete Due Diligence Report
     */
    @GetMapping("/{propertyId}")
    public ResponseEntity<DueDiligenceReportResponse> generateReport(
            @PathVariable Long propertyId) {

        DueDiligenceReportResponse report =
                dueDiligenceReportService.generateReport(propertyId);

        return ResponseEntity.ok(report);
    }

    /**
     * Generate Summary
     */
    @GetMapping("/{propertyId}/summary")
    public ResponseEntity<String> getSummary(
            @PathVariable Long propertyId) {

        DueDiligenceReportResponse report =
                dueDiligenceReportService.generateReport(propertyId);

        String summary = String.format(
                """
                ===============================
                    DUE DILIGENCE REPORT
                ===============================

                Property ID      : %d
                Property         : %s
                Owner            : %s
                Property Type    : %s

                -------------------------------
                Risk Assessment
                -------------------------------

                Risk Level       : %s
                Risk Score       : %s

                -------------------------------
                Recommendation
                -------------------------------

                %s

                ===============================
                """,
                report.getPropertyId(),
                report.getPropertyTitle(),
                report.getOwnerName(),
                report.getPropertyType(),
                report.getRiskLevel(),
                report.getTotalRiskScore(),
                report.getRecommendation());

        return ResponseEntity.ok(summary);
    }

    /**
     * Report History
     */
    @GetMapping("/{propertyId}/history")
    public ResponseEntity<List<DueDiligenceReport>> getReportHistory(
            @PathVariable Long propertyId) {

        List<DueDiligenceReport> reports =
                dueDiligenceReportRepository.findByPropertyId(propertyId);

        return ResponseEntity.ok(reports);
    }
}