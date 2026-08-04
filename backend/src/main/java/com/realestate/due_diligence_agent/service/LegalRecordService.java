package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.LegalRecordRequest;
import com.realestate.due_diligence_agent.dto.LegalRecordResponse;
import com.realestate.due_diligence_agent.entity.LegalRecord;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.repository.LegalRecordRepository;

/**
 * Legal record data, backed by PostgreSQL. Values come from what the seller
 * enters on Add/Edit Property — nothing here is generated.
 */
@Service
public class LegalRecordService {

    private final LegalRecordRepository legalRecordRepository;

    public LegalRecordService(LegalRecordRepository legalRecordRepository) {
        this.legalRecordRepository = legalRecordRepository;
    }

    public LegalRecord buildFromRequest(LegalRecordRequest request, Property property) {
        LegalRecord legalRecord = new LegalRecord();
        legalRecord.setProperty(property);
        applyRequest(legalRecord, request);
        return legalRecord;
    }

    public void applyRequest(LegalRecord legalRecord, LegalRecordRequest request) {
        if (request == null) {
            return;
        }
        legalRecord.setCourtCases(request.getCourtCases());
        legalRecord.setCaseStatus(request.getCaseStatus());
        legalRecord.setRemarks(request.getRemarks());
    }

    public LegalRecordResponse getLegalRecord(Property property) {
        LegalRecord legalRecord = property.getLegalRecord();
        if (legalRecord == null) {
            return null;
        }
        return new LegalRecordResponse(
                legalRecord.getCourtCases(),
                legalRecord.getCaseStatus(),
                legalRecord.getRemarks()
        );
    }

    public LegalRecordRepository getRepository() {
        return legalRecordRepository;
    }
}