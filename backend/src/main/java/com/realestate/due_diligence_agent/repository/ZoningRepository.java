package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.due_diligence_agent.entity.Zoning;

public interface ZoningRepository extends JpaRepository<Zoning, Long> {

    Optional<Zoning> findByPropertyId(Long propertyId);
}