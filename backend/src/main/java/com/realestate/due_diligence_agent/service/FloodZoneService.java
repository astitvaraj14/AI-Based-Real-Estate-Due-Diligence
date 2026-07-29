package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;
import com.realestate.due_diligence_agent.dto.FloodZoneResponse;
import com.realestate.due_diligence_agent.entity.Property;


@Service

public class FloodZoneService {

    public FloodZoneResponse getFloodZone(Property property){
        return new FloodZoneResponse(

                "Zone A",
                "Low",
                "NO",
                property.getCity() + "Flood Monitoring Authority"
        );
    }

}
