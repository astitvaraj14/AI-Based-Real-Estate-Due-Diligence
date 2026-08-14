package com.realestate.due_diligence_agent.repository;

import com.realestate.due_diligence_agent.entity.RiskAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RiskAssessmentRepository extends JpaRepository<RiskAssessment, Long> {

    Optional<RiskAssessment> findFirstByPropertyIdOrderByIdDesc(Long propertyId);

}