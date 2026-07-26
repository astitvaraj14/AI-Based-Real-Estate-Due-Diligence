package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.LegalRecordResponse;
import com.realestate.due_diligence_agent.entity.Property;
import org.springframework.stereotype.Service;

@Service
public class LegalRecordService {

    public LegalRecordResponse getLegalRecord(Property property){
        return new LegalRecordResponse(

                "NO",
                "No Active Cases",
                "Property Is Legally Clear"
        );
    }
}
