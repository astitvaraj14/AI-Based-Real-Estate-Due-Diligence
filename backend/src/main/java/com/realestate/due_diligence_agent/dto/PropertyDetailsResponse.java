
package com.realestate.due_diligence_agent.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDetailsResponse {

    private Long id;
    private String title;
    private String address;
    private String city;
    private String state;
    private String propertyType;
    private Double price;
    private Double area;
    private String ownerName;
    private String verificationStatus;
    private Double verificationScore;
    private LocalDate registrationDate;
    private LocalDate verificationDate;

    // Public Land Registry
    private LandRegistryResponse landRegistry;

    // Ownership Records
    private OwnershipResponse ownership;

    // Legal Records
    private LegalRecordResponse legalRecord;

    // Zoning Records
    private ZoningResponse zoning;

    // Flood Records
    private FloodZoneResponse floodZone;
}
