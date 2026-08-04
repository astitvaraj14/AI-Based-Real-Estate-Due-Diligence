package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.FloodZone;

public interface FloodZoneRepository extends JpaRepository<FloodZone, Long> {

    Optional<FloodZone> findByPropertyId(Long propertyId);
}