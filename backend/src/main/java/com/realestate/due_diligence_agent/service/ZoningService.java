package com.realestate.due_diligence_agent.service;

import com.realestate.due_diligence_agent.dto.ZoningResponse;
import com.realestate.due_diligence_agent.entity.Property;
import org.springframework.stereotype.Service;

@Service
public class ZoningService {

    public ZoningResponse getZoning(Property property){

        return new ZoningResponse(

                "Residential",

                "YES",

                property.getCity() + " Municipal Corporation"

        );

    }

}
