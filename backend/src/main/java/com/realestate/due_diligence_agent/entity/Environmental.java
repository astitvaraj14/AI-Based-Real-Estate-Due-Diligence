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
@Table(name = "environmental")
public class Environmental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String environmentalRisk;

    private String pollutionLevel;

    private String protectedArea;

    private String remarks;

    // Owning side of the link back to Property. @JsonIgnore stops Jackson
    // from walking Property -> this -> Property -> ... in an infinite loop
    // when a Property entity is serialized directly by the controller.
    @OneToOne
    @JoinColumn(name = "property_id", unique = true)
    @JsonIgnore
    private Property property;

    public Environmental() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnvironmentalRisk() {
        return environmentalRisk;
    }

    public void setEnvironmentalRisk(String environmentalRisk) {
        this.environmentalRisk = environmentalRisk;
    }

    public String getPollutionLevel() {
        return pollutionLevel;
    }

    public void setPollutionLevel(String pollutionLevel) {
        this.pollutionLevel = pollutionLevel;
    }

    public String getProtectedArea() {
        return protectedArea;
    }

    public void setProtectedArea(String protectedArea) {
        this.protectedArea = protectedArea;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}