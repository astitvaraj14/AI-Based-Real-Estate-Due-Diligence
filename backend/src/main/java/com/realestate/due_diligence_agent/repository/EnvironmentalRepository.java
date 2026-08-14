package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.Environmental;

public interface EnvironmentalRepository extends JpaRepository<Environmental, Long> {

    Optional<Environmental> findFirstByPropertyIdOrderByIdDesc(Long propertyId);
}