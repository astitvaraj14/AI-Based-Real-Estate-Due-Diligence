package com.realestate.due_diligence_agent.dto;

public class AddressValidationResponse {

    private boolean valid;
    private String message;
    private Double latitude;
    private Double longitude;

    public AddressValidationResponse() {
    }

    public AddressValidationResponse(boolean valid, String message) {
        this.valid = valid;
        this.message = message;
    }

    public AddressValidationResponse(boolean valid, String message, Double latitude, Double longitude) {
        this.valid = valid;
        this.message = message;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
