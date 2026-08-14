package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realestate.due_diligence_agent.entity.FloodZone;

@Repository
public interface FloodZoneRepository extends JpaRepository<FloodZone, Long> {

    Optional<FloodZone> findFirstByPropertyIdOrderByIdDesc(Long propertyId);

}