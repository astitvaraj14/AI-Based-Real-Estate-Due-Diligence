package com.realestate.due_diligence_agent.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.PropertyTaxHistory;
import com.realestate.due_diligence_agent.exception.ResourceNotFoundException;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import com.realestate.due_diligence_agent.repository.PropertyTaxHistoryRepository;

@Service
public class PropertyTaxHistoryServiceImpl implements PropertyTaxHistoryService {

    private final PropertyTaxHistoryRepository taxHistoryRepository;
    private final PropertyRepository propertyRepository;

    public PropertyTaxHistoryServiceImpl(
            PropertyTaxHistoryRepository taxHistoryRepository,
            PropertyRepository propertyRepository) {

        this.taxHistoryRepository = taxHistoryRepository;
        this.propertyRepository = propertyRepository;
    }

    @Override
    public List<PropertyTaxHistory> getTaxHistoryByPropertyId(Long propertyId) {
        return taxHistoryRepository.findByPropertyId(propertyId);
    }

    @Override
    public PropertyTaxHistory addTaxHistory(Long propertyId, PropertyTaxHistory taxHistory) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        taxHistory.setProperty(property);

        return taxHistoryRepository.save(taxHistory);
    }

    @Override
    public PropertyTaxHistory updateTaxHistory(Long id, PropertyTaxHistory updatedTaxHistory) {

        PropertyTaxHistory existing = taxHistoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tax history not found"));

        existing.setTaxYear(updatedTaxHistory.getTaxYear());
        existing.setTaxAmount(updatedTaxHistory.getTaxAmount());
        existing.setPaymentStatus(updatedTaxHistory.getPaymentStatus());
        existing.setPaymentDate(updatedTaxHistory.getPaymentDate());

        return taxHistoryRepository.save(existing);
    }

    @Override
    public void deleteTaxHistory(Long id) {
        taxHistoryRepository.deleteById(id);
    }
}