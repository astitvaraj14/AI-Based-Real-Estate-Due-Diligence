package com.realestate.due_diligence_agent.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import com.realestate.due_diligence_agent.entity.AuditLog;
import com.realestate.due_diligence_agent.entity.DueDiligenceReport;
import com.realestate.due_diligence_agent.repository.DueDiligenceReportRepository;
import com.realestate.due_diligence_agent.service.AuditLogService;
import com.realestate.due_diligence_agent.dto.DueDiligenceReportResponse;
import com.realestate.due_diligence_agent.entity.FloodZone;
import com.realestate.due_diligence_agent.entity.LegalRecord;
import com.realestate.due_diligence_agent.entity.Ownership;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.PropertyTaxHistory;
import com.realestate.due_diligence_agent.entity.RiskAssessment;
import com.realestate.due_diligence_agent.entity.Zoning;
import com.realestate.due_diligence_agent.repository.FloodZoneRepository;
import com.realestate.due_diligence_agent.repository.LegalRecordRepository;
import com.realestate.due_diligence_agent.repository.OwnershipRepository;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import com.realestate.due_diligence_agent.repository.PropertyTaxHistoryRepository;
import com.realestate.due_diligence_agent.repository.RiskAssessmentRepository;
import com.realestate.due_diligence_agent.repository.ZoningRepository;

@Service
public class DueDiligenceReportServiceImpl implements DueDiligenceReportService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private OwnershipRepository ownershipRepository;

    @Autowired
    private LegalRecordRepository legalRecordRepository;

    @Autowired
    private FloodZoneRepository floodZoneRepository;

    @Autowired
    private PropertyTaxHistoryRepository propertyTaxHistoryRepository;

    @Autowired
    private ZoningRepository zoningRepository;

    @Autowired
    private RiskAssessmentRepository riskAssessmentRepository;

    @Autowired
    private DueDiligenceReportRepository dueDiligenceReportRepository;

    @Autowired
    private AuditLogService auditLogService;

    @Override
    public DueDiligenceReportResponse generateReport(Long propertyId) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        DueDiligenceReportResponse response = new DueDiligenceReportResponse();

        // Property Details
        response.setPropertyId(property.getId());
        response.setPropertyTitle(property.getTitle());
        response.setOwnerName(property.getOwnerName());
        response.setPropertyType(property.getPropertyType());
        response.setAddress(property.getAddress());
        response.setCity(property.getCity());
        response.setState(property.getState());
        response.setArea(property.getArea());
        response.setPrice(property.getPrice());

        // Ownership
        ownershipRepository.findByPropertyId(propertyId).ifPresent(ownership -> {
            response.setOwnerVerified(ownership.isOwnerVerified());
            response.setOwnershipType(ownership.getOwnershipType());
            response.setOwnershipRemarks(ownership.getRemarks());
        });

        // Legal Record
        legalRecordRepository.findByPropertyId(propertyId).ifPresent(legal -> {
            response.setCourtCases(legal.getCourtCases());
            response.setCaseStatus(legal.getCaseStatus());
            response.setLegalRemarks(legal.getRemarks());
        });

        // Flood Zone
        floodZoneRepository.findByPropertyId(propertyId).ifPresent(flood ->
                response.setFloodRiskLevel(flood.getRiskLevel())
        );

        // Tax History
        List<PropertyTaxHistory> taxes =
                propertyTaxHistoryRepository.findByPropertyId(propertyId);

        taxes.stream()
                .max(Comparator.comparing(PropertyTaxHistory::getTaxYear))
                .ifPresent(latest ->
                        response.setLatestTaxStatus(latest.getPaymentStatus()));

        // Zoning
        zoningRepository.findByPropertyId(propertyId).ifPresent(zoning -> {
            response.setZoneType(zoning.getZoneType());
            response.setConstructionAllowed(zoning.getConstructionAllowed());
        });

        // Risk Assessment
        riskAssessmentRepository.findByPropertyId(propertyId).ifPresent(risk -> {
            response.setTotalRiskScore(risk.getTotalScore());
            response.setRiskLevel(risk.getRiskLevel());
            response.setRecommendation(risk.getRecommendation());


        });
        // Save report history
        DueDiligenceReport report = new DueDiligenceReport();
        report.setPropertyId(response.getPropertyId());
        report.setPropertyTitle(response.getPropertyTitle());
        report.setOwnerName(response.getOwnerName());
        report.setTotalRiskScore(response.getTotalRiskScore());
        report.setRiskLevel(response.getRiskLevel());
        report.setRecommendation(response.getRecommendation());
        report.setGeneratedAt(LocalDateTime.now());

        dueDiligenceReportRepository.save(report);

        // Save audit log
        AuditLog auditLog = new AuditLog();
        auditLog.setUserId(1L); // Temporary user ID
        auditLog.setPropertyId(propertyId);
        auditLog.setAction("GENERATE_REPORT");
        auditLog.setModule("Due Diligence");
        auditLog.setDescription("Generated due diligence report for property ID " + propertyId);
        auditLog.setActionTime(LocalDateTime.now());

        auditLogService.save(auditLog);

        return response;
    }
}