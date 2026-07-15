package com.realestate.due_diligence_agent.service;

import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.AddressValidationResponse;

@Service
public class AddressValidationService {

    public AddressValidationResponse validateAddress(String address) {

        if (address == null || address.isBlank()) {
            return new AddressValidationResponse(
                    false,
                    "Address cannot be empty");
        }

        if (address.length() < 8) {
            return new AddressValidationResponse(
                    false,
                    "Invalid address");
        }

        return new AddressValidationResponse(
                true,
                "Address verified successfully");
    }
}
