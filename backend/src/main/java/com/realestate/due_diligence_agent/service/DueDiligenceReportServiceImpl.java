package com.realestate.due_diligence_agent.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        return response;
    }
}