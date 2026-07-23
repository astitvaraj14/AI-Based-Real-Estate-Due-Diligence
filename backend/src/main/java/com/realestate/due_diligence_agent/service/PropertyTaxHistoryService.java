package com.realestate.due_diligence_agent.service;

import java.util.List;

import com.realestate.due_diligence_agent.entity.PropertyTaxHistory;

public interface PropertyTaxHistoryService {

    List<PropertyTaxHistory> getTaxHistoryByPropertyId(Long propertyId);

    PropertyTaxHistory addTaxHistory(Long propertyId, PropertyTaxHistory taxHistory);

    PropertyTaxHistory updateTaxHistory(Long id, PropertyTaxHistory taxHistory);

    void deleteTaxHistory(Long id);
}