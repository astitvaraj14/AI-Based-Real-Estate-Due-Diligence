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
@Table(name = "ownership")
public class Ownership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownershipType;

    private String ownershipSince;

    private boolean ownerVerified;

    private String remarks;

    // Owning side of the link back to Property. @JsonIgnore stops Jackson
    // from walking Property -> this -> Property -> ... in an infinite loop
    // when a Property entity is serialized directly by the controller.
    @OneToOne
    @JoinColumn(name = "property_id", unique = true)
    @JsonIgnore
    private Property property;

    public Ownership() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnershipType() {
        return ownershipType;
    }

    public void setOwnershipType(String ownershipType) {
        this.ownershipType = ownershipType;
    }

    public String getOwnershipSince() {
        return ownershipSince;
    }

    public void setOwnershipSince(String ownershipSince) {
        this.ownershipSince = ownershipSince;
    }

    public boolean isOwnerVerified() {
        return ownerVerified;
    }

    public void setOwnerVerified(boolean ownerVerified) {
        this.ownerVerified = ownerVerified;
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