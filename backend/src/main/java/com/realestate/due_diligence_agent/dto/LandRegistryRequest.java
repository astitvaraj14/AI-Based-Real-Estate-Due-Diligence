package com.realestate.due_diligence_agent.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LandRegistryRequest {

    private String registryNumber;

    private String registryStatus;

    private String registryOffice;

    private Boolean titleVerified;

    private String lastUpdated;

}