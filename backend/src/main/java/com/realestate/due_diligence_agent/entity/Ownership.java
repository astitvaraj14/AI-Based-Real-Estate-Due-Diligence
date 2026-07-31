package com.realestate.due_diligence_agent.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ownership")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ownership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerName;

    private Boolean ownerVerified;

    private String ownershipType;

    private String ownershipSince;

    private String remarks;

    @OneToOne
    @JoinColumn(name = "property_id")
    @JsonBackReference
    private Property property;
}