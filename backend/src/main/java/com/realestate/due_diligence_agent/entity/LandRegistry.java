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
@Table(name = "land_registry")
public class LandRegistry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registryNumber;

    private String registryStatus;

    private String registryOffice;

    private boolean titleVerified;

    private String lastUpdated;

    // Owning side of the link back to Property. @JsonIgnore stops Jackson
    // from walking Property -> this -> Property -> ... in an infinite loop
    // when a Property entity is serialized directly by the controller.
    @OneToOne
    @JoinColumn(name = "property_id", unique = true)
    @JsonIgnore
    private Property property;

    public LandRegistry() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistryNumber() {
        return registryNumber;
    }

    public void setRegistryNumber(String registryNumber) {
        this.registryNumber = registryNumber;
    }

    public String getRegistryStatus() {
        return registryStatus;
    }

    public void setRegistryStatus(String registryStatus) {
        this.registryStatus = registryStatus;
    }

    public String getRegistryOffice() {
        return registryOffice;
    }

    public void setRegistryOffice(String registryOffice) {
        this.registryOffice = registryOffice;
    }

    public boolean isTitleVerified() {
        return titleVerified;
    }

    public void setTitleVerified(boolean titleVerified) {
        this.titleVerified = titleVerified;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}