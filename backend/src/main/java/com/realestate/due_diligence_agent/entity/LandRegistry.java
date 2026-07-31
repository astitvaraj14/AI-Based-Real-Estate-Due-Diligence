package com.realestate.due_diligence_agent.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "land_registry")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class LandRegistry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registryNumber;
    private String registryStatus;
    private String registryOffice;
    private boolean titleVerified;
    private String lastUpdated;

    @OneToOne
    @JoinColumn(name = "property_id")
    @JsonBackReference
    private Property property;
}
