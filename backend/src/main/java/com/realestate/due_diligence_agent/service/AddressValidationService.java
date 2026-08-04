package com.realestate.due_diligence_agent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.AddressValidationResponse;

@Service
public class AddressValidationService {

    private static final Logger log = LoggerFactory.getLogger(AddressValidationService.class);

    // Stands in for a call to an external address-validation API. Retried on
    // transient failures with exponential backoff; falls back gracefully if
    // the service still can't be reached after 3 attempts.
    @Retryable(
            retryFor = Exception.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 500, multiplier = 2))
    public AddressValidationResponse validateAddress(String address) {

        if (address == null || address.isBlank()) {
            return new AddressValidationResponse(
                    false,
                    "Address cannot be empty");
        }

        if (address.trim().length() < 3) {
            return new AddressValidationResponse(
                    false,
                    "Address is too short");
        }

        return new AddressValidationResponse(
                true,
                "Address verified successfully");
    }

    @Recover
    public AddressValidationResponse recoverValidateAddress(Exception ex, String address) {
        log.warn("Address validation failed after retries for address '{}': {}", address, ex.getMessage());
        return new AddressValidationResponse(
                false,
                "Address validation service is currently unavailable. Please try again later.");
    }
}