package com.realestate.due_diligence_agent.repository;

import com.realestate.due_diligence_agent.entity.FloodZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FloodZoneRepository extends JpaRepository<FloodZone, Long> {
}