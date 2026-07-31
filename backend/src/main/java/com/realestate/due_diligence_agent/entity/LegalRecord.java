package com.realestate.due_diligence_agent.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "legal_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LegalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courtCases;

    private String caseStatus;

    private String remarks;

    @OneToOne
    @JoinColumn(name = "property_id")
    @JsonBackReference
    private Property property;
}