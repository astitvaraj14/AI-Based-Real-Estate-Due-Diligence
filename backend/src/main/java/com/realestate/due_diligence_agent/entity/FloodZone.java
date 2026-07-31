package com.realestate.due_diligence_agent.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "flood_zone")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FloodZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String zoneType;

    private String riskLevel;

    private String insuranceRequired;

    private String authority;

    @OneToOne
    @JoinColumn(name = "property_id")
    @JsonBackReference
    private Property property;
}