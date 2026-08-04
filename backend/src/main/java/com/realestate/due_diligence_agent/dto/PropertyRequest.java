package com.realestate.due_diligence_agent.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class PropertyRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Property type is required")
    private String propertyType;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    private Double price;

    @NotNull(message = "Area is required")
    @Positive(message = "Area must be greater than zero")
    private Double area;

    @NotBlank(message = "Owner name is required")
    private String ownerName;

    // Nested due-diligence sections. Each is optional: when a section is
    // omitted from the JSON body it stays null here and PropertyService
    // leaves the corresponding stored record untouched (see updateProperty).
    // @Valid cascades bean validation into whichever sections are present.
    @Valid
    private LandRegistryRequest landRegistry;

    @Valid
    private OwnershipRequest ownership;

    @Valid
    private LegalRecordRequest legalRecord;

    @Valid
    private ZoningRequest zoning;

    @Valid
    private FloodZoneRequest floodZone;

    @Valid
    private PermitRequest permit;

    @Valid
    private EnvironmentalRequest environmental;

    public PropertyRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public LandRegistryRequest getLandRegistry() {
        return landRegistry;
    }

    public void setLandRegistry(LandRegistryRequest landRegistry) {
        this.landRegistry = landRegistry;
    }

    public OwnershipRequest getOwnership() {
        return ownership;
    }

    public void setOwnership(OwnershipRequest ownership) {
        this.ownership = ownership;
    }

    public LegalRecordRequest getLegalRecord() {
        return legalRecord;
    }

    public void setLegalRecord(LegalRecordRequest legalRecord) {
        this.legalRecord = legalRecord;
    }

    public ZoningRequest getZoning() {
        return zoning;
    }

    public void setZoning(ZoningRequest zoning) {
        this.zoning = zoning;
    }

    public FloodZoneRequest getFloodZone() {
        return floodZone;
    }

    public void setFloodZone(FloodZoneRequest floodZone) {
        this.floodZone = floodZone;
    }

    public PermitRequest getPermit() {
        return permit;
    }

    public void setPermit(PermitRequest permit) {
        this.permit = permit;
    }

    public EnvironmentalRequest getEnvironmental() {
        return environmental;
    }

    public void setEnvironmental(EnvironmentalRequest environmental) {
        this.environmental = environmental;
    }
}