package com.realestate.due_diligence_agent.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "flood_zone")
public class FloodZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String zoneType;

    private String riskLevel;

    private String insuranceRequired;

    private String authority;

    // Owning side of the link back to Property. @JsonIgnore stops Jackson
    // from walking Property -> this -> Property -> ... in an infinite loop
    // when a Property entity is serialized directly by the controller.
    @OneToOne
    @JoinColumn(name = "property_id", unique = true)
    @JsonIgnore
    private Property property;

    public FloodZone() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZoneType() {
        return zoneType;
    }

    public void setZoneType(String zoneType) {
        this.zoneType = zoneType;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getInsuranceRequired() {
        return insuranceRequired;
    }

    public void setInsuranceRequired(String insuranceRequired) {
        this.insuranceRequired = insuranceRequired;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}