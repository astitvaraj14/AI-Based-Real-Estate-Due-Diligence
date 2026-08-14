package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.Permit;

public interface PermitRepository extends JpaRepository<Permit, Long> {

    Optional<Permit> findFirstByPropertyIdOrderByIdDesc(Long propertyId);
}