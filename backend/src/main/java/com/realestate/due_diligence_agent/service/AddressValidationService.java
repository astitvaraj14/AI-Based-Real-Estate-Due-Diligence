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

    // Calls Nominatim API to validate the address against real OSM data.
    @Retryable(
            retryFor = Exception.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 500, multiplier = 2))
    public AddressValidationResponse validateAddress(String address, String city, String state) {

        if (address == null || address.isBlank()) {
            return new AddressValidationResponse(
                    false,
                    "Address cannot be empty");
        }

        String query = address;
        if (city != null && !city.isBlank()) {
            query += ", " + city;
        }
        if (state != null && !state.isBlank()) {
            query += ", " + state;
        }

        try {
            org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
            
            // Nominatim requires a User-Agent
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("User-Agent", "DueDiligencePlatform/1.0");
            
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);
            
            String url = "https://nominatim.openstreetmap.org/search?q=" + query.replace(" ", "+") + "+India&format=json&limit=1";
            
            org.springframework.http.ResponseEntity<java.util.Map[]> response = restTemplate.exchange(
                    url, 
                    org.springframework.http.HttpMethod.GET, 
                    entity, 
                    java.util.Map[].class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null && response.getBody().length > 0) {
                java.util.Map<String, Object> firstResult = response.getBody()[0];
                Double lat = null;
                Double lon = null;
                try {
                    lat = Double.parseDouble(firstResult.get("lat").toString());
                    lon = Double.parseDouble(firstResult.get("lon").toString());
                } catch (Exception parseEx) {
                    log.warn("Could not parse lat/lon from Nominatim: " + parseEx.getMessage());
                }
                return new AddressValidationResponse(true, "Address verified successfully", lat, lon);
            }
            
            // Fallback 1: Try just City and State
            if (city != null && !city.isBlank()) {
                String fallbackQuery = city + (state != null && !state.isBlank() ? ", " + state : "");
                String fallbackUrl = "https://nominatim.openstreetmap.org/search?q=" + fallbackQuery.replace(" ", "+") + "+India&format=json&limit=1";
                
                response = restTemplate.exchange(fallbackUrl, org.springframework.http.HttpMethod.GET, entity, java.util.Map[].class);
                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null && response.getBody().length > 0) {
                    java.util.Map<String, Object> firstResult = response.getBody()[0];
                    Double lat = null;
                    Double lon = null;
                    try {
                        lat = Double.parseDouble(firstResult.get("lat").toString());
                        lon = Double.parseDouble(firstResult.get("lon").toString());
                    } catch (Exception parseEx) {
                        log.warn("Could not parse lat/lon from Nominatim: " + parseEx.getMessage());
                    }
                    return new AddressValidationResponse(true, "Address verified (City Level)", lat, lon);
                }
            }
            
            // Fallback 2: If everything fails, don't block the user, just return valid without coordinates
            return new AddressValidationResponse(true, "Address accepted (No coordinates found)", null, null);
        } catch (Exception e) {
            log.error("Error validating address with Nominatim: " + e.getMessage());
            throw new RuntimeException("API error", e);
        }
    }

    @Recover
    public AddressValidationResponse recoverValidateAddress(Exception ex, String address, String city, String state) {
        log.warn("Address validation failed after retries for address '{}': {}", address, ex.getMessage());
        return new AddressValidationResponse(
                true,
                "Address accepted (Validation service offline)",
                null,
                null);
    }
}