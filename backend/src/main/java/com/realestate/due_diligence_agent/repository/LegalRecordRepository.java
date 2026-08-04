package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.LegalRecord;

public interface LegalRecordRepository extends JpaRepository<LegalRecord, Long> {

    Optional<LegalRecord> findByPropertyId(Long propertyId);
}