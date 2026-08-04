package com.realestate.due_diligence_agent.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.RiskAssessmentResponse;
import com.realestate.due_diligence_agent.entity.Environmental;
import com.realestate.due_diligence_agent.entity.FloodZone;
import com.realestate.due_diligence_agent.entity.LegalRecord;
import com.realestate.due_diligence_agent.entity.Ownership;
import com.realestate.due_diligence_agent.entity.Permit;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.PropertyTaxHistory;
import com.realestate.due_diligence_agent.entity.RiskAssessment;
import com.realestate.due_diligence_agent.exception.ResourceNotFoundException;
import com.realestate.due_diligence_agent.repository.EnvironmentalRepository;
import com.realestate.due_diligence_agent.repository.FloodZoneRepository;
import com.realestate.due_diligence_agent.repository.LegalRecordRepository;
import com.realestate.due_diligence_agent.repository.OwnershipRepository;
import com.realestate.due_diligence_agent.repository.PermitRepository;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import com.realestate.due_diligence_agent.repository.PropertyTaxHistoryRepository;
import com.realestate.due_diligence_agent.repository.RiskAssessmentRepository;

@Service
public class RiskAssessmentServiceImpl implements RiskAssessmentService {

    @Autowired
    private RiskAssessmentRepository repository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private LegalRecordRepository legalRecordRepository;

    @Autowired
    private OwnershipRepository ownershipRepository;

    @Autowired
    private FloodZoneRepository floodZoneRepository;

    @Autowired
    private EnvironmentalRepository environmentalRepository;

    @Autowired
    private PermitRepository permitRepository;

    @Autowired
    private PropertyTaxHistoryRepository propertyTaxHistoryRepository;

    @Override
    public RiskAssessmentResponse generateRiskAssessment(Long propertyId) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        RiskAssessment risk = new RiskAssessment();
        risk.setPropertyId(propertyId);

        List<String> recommendations = new ArrayList<>();

        // ------------------------------------------------------------
        // documentationRisk bucket: Verification + Permit + Tax records
        // ------------------------------------------------------------
        int documentationRisk = 0;

        String verificationStatus = property.getVerificationStatus();
        if (verificationStatus == null || !"VERIFIED".equalsIgnoreCase(verificationStatus)) {
            documentationRisk += 20;
            recommendations.add("Property verification is incomplete.");
        }

        Double verificationScore = property.getVerificationScore();
        if (verificationScore != null && verificationScore < 70) {
            documentationRisk += 10;
        }

        Optional<Permit> permitOpt = permitRepository.findByPropertyId(propertyId);
        if (permitOpt.isEmpty()) {
            documentationRisk += 10;
            recommendations.add("Obtain construction permit.");
        } else {
            String permitStatus = permitOpt.get().getPermitStatus();
            if (permitStatus == null || !"APPROVED".equalsIgnoreCase(permitStatus)) {
                documentationRisk += 5;
                recommendations.add("Pending permit approval should be resolved.");
            }
        }

        List<PropertyTaxHistory> taxHistory = propertyTaxHistoryRepository.findByPropertyId(propertyId);
        boolean hasPendingTax = false;
        if (taxHistory != null) {
            for (PropertyTaxHistory tax : taxHistory) {
                if (!"PAID".equalsIgnoreCase(tax.getPaymentStatus())) {
                    documentationRisk += 5;
                    hasPendingTax = true;
                }
            }
        }
        if (hasPendingTax) {
            recommendations.add("Clear pending property taxes.");
        }

        // ------------------------------------------------------------
        // legalRisk bucket: Legal Records + Ownership (title/legal in nature)
        // ------------------------------------------------------------
        int legalRisk = 0;

        Optional<LegalRecord> legalOpt = legalRecordRepository.findByPropertyId(propertyId);
        if (legalOpt.isPresent()) {
            LegalRecord legalRecord = legalOpt.get();
            boolean hasCourtCases = "YES".equalsIgnoreCase(legalRecord.getCourtCases());
            boolean caseNotClosed = legalRecord.getCaseStatus() != null
                    && !"CLOSED".equalsIgnoreCase(legalRecord.getCaseStatus());

            if (hasCourtCases) {
                legalRisk += 20;
            }
            if (caseNotClosed) {
                legalRisk += 10;
            }
            if (hasCourtCases || caseNotClosed) {
                recommendations.add("Legal verification is recommended.");
            }
        }

        Optional<Ownership> ownershipOpt = ownershipRepository.findByPropertyId(propertyId);
        if (ownershipOpt.isPresent() && !ownershipOpt.get().isOwnerVerified()) {
            legalRisk += 10;
            recommendations.add("Ownership verification is recommended.");
        }

        // ------------------------------------------------------------
        // crimeRisk bucket: reused to hold Flood Zone risk, since this
        // project has no separate Crime entity/repository — only the
        // entities listed for this feature (Property, Ownership,
        // LegalRecord, FloodZone, Permit, Environmental,
        // PropertyTaxHistory, LandRegistry, Zoning) are available, and the
        // RiskAssessment entity's fixed columns don't include a flood
        // bucket of its own.
        // ------------------------------------------------------------
        int crimeRisk = 0;

        Optional<FloodZone> floodZoneOpt = floodZoneRepository.findByPropertyId(propertyId);
        if (floodZoneOpt.isPresent()) {
            String floodRiskLevel = floodZoneOpt.get().getRiskLevel();
            if ("HIGH".equalsIgnoreCase(floodRiskLevel)) {
                crimeRisk += 20;
                recommendations.add("Flood insurance is recommended.");
            } else if ("MEDIUM".equalsIgnoreCase(floodRiskLevel)) {
                crimeRisk += 10;
                recommendations.add("Flood insurance is recommended.");
            } else if ("LOW".equalsIgnoreCase(floodRiskLevel)) {
                crimeRisk += 5;
            }
        }

        // ------------------------------------------------------------
        // environmentalRisk bucket
        // ------------------------------------------------------------
        int environmentalRisk = 0;

        Optional<Environmental> environmentalOpt = environmentalRepository.findByPropertyId(propertyId);
        if (environmentalOpt.isPresent()) {
            Environmental environmental = environmentalOpt.get();
            if ("HIGH".equalsIgnoreCase(environmental.getEnvironmentalRisk())) {
                environmentalRisk += 15;
                recommendations.add("Environmental assessment is recommended.");
            }
            if ("HIGH".equalsIgnoreCase(environmental.getPollutionLevel())) {
                environmentalRisk += 5;
            }
        }

        // ------------------------------------------------------------
        // marketRisk bucket: property price
        // ------------------------------------------------------------
        int marketRisk = 0;
        Double price = property.getPrice();
        if (price != null && price > 10_000_000) {
            marketRisk += 5;
        }

        // ------------------------------------------------------------
        // infrastructureRisk bucket: property area
        // ------------------------------------------------------------
        int infrastructureRisk = 0;
        Double area = property.getArea();
        if (area != null && area < 500) {
            infrastructureRisk += 5;
        }

        risk.setLegalRisk(legalRisk);
        risk.setEnvironmentalRisk(environmentalRisk);
        risk.setCrimeRisk(crimeRisk);
        risk.setMarketRisk(marketRisk);
        risk.setInfrastructureRisk(infrastructureRisk);
        risk.setDocumentationRisk(documentationRisk);

        int totalScore =
                risk.getLegalRisk()
                + risk.getEnvironmentalRisk()
                + risk.getCrimeRisk()
                + risk.getMarketRisk()
                + risk.getInfrastructureRisk()
                + risk.getDocumentationRisk();

        risk.setTotalScore(totalScore);

        String fallbackRecommendation;
        if (totalScore <= 25) {
            risk.setRiskLevel("LOW");
            fallbackRecommendation = "Property is generally safe.";
        } else if (totalScore <= 50) {
            risk.setRiskLevel("MEDIUM");
            fallbackRecommendation = "Review important property documents.";
        } else if (totalScore <= 75) {
            risk.setRiskLevel("HIGH");
            fallbackRecommendation = "Legal verification is recommended before purchase.";
        } else {
            risk.setRiskLevel("VERY HIGH");
            fallbackRecommendation = "Avoid purchase until all risks are resolved.";
        }

        String recommendation;
        if (!recommendations.isEmpty()) {
            recommendation = String.join(" ", recommendations);
            if (recommendation.length() > 500) {
                recommendation = recommendation.substring(0, 497) + "...";
            }
        } else {
            recommendation = fallbackRecommendation;
        }
        risk.setRecommendation(recommendation);

        repository.save(risk);

        return new RiskAssessmentResponse(
                risk.getPropertyId(),
                risk.getTotalScore(),
                risk.getRiskLevel(),
                risk.getRecommendation()
        );
    }

    @Override
    public RiskAssessmentResponse getRiskAssessment(Long propertyId) {

        RiskAssessment risk = repository.findByPropertyId(propertyId)
                .orElseThrow(() ->
                        new RuntimeException("Risk Assessment Not Found"));

        return new RiskAssessmentResponse(
                risk.getPropertyId(),
                risk.getTotalScore(),
                risk.getRiskLevel(),
                risk.getRecommendation()
        );
    }
}