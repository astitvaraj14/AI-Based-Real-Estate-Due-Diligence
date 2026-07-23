package com.realestate.due_diligence_agent.dto;

import java.time.LocalDate;

public class PropertySummaryResponse {

    private Long id;
    private String title;
    private String ownerName;
    private String address;
    private String city;
    private String state;
    private String propertyType;
    private Double area;
    private Double price;
    private String verificationStatus;
    private Double verificationScore;
    private LocalDate registrationDate;
    private LocalDate verificationDate;

    public PropertySummaryResponse() {
    }

    public PropertySummaryResponse(
            Long id,
            String title,
            String ownerName,
            String address,
            String city,
            String state,
            String propertyType,
            Double area,
            Double price,
            String verificationStatus,
            Double verificationScore,
            LocalDate registrationDate,
            LocalDate verificationDate) {

        this.id = id;
        this.title = title;
        this.ownerName = ownerName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.propertyType = propertyType;
        this.area = area;
        this.price = price;
        this.verificationStatus = verificationStatus;
        this.verificationScore = verificationScore;
        this.registrationDate = registrationDate;
        this.verificationDate = verificationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public Double getVerificationScore() {
        return verificationScore;
    }

    public void setVerificationScore(Double verificationScore) {
        this.verificationScore = verificationScore;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public LocalDate getVerificationDate() {
        return verificationDate;
    }

    public void setVerificationDate(LocalDate verificationDate) {
        this.verificationDate = verificationDate;
    }
}
