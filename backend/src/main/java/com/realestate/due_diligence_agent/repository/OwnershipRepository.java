package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.Ownership;

public interface OwnershipRepository extends JpaRepository<Ownership, Long> {

    Optional<Ownership> findByPropertyId(Long propertyId);
}