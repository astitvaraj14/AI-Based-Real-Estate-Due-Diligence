package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realestate.due_diligence_agent.entity.Zoning;

@Repository
public interface ZoningRepository extends JpaRepository<Zoning, Long> {

    Optional<Zoning> findFirstByPropertyIdOrderByIdDesc(Long propertyId);

}