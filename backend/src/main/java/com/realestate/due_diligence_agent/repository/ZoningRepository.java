package com.realestate.due_diligence_agent.repository;

import com.realestate.due_diligence_agent.entity.Zoning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZoningRepository extends JpaRepository<Zoning, Long> {

}