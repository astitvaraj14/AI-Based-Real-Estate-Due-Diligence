package com.realestate.due_diligence_agent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realestate.due_diligence_agent.entity.PropertyTaxHistory;

@Repository
public interface PropertyTaxHistoryRepository extends JpaRepository<PropertyTaxHistory, Long> {

    List<PropertyTaxHistory> findByPropertyId(Long propertyId);

}