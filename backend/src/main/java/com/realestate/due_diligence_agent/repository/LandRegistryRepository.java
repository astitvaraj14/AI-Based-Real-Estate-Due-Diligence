package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.LandRegistry;

public interface LandRegistryRepository extends JpaRepository<LandRegistry, Long> {

    Optional<LandRegistry> findByPropertyId(Long propertyId);
}