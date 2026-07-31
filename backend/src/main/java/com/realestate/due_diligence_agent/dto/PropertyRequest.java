package com.realestate.due_diligence_agent.dto;

public class PropertyRequest {

    private String title;
    private String address;
    private String city;
    private String state;
    private String propertyType;
    private Double price;
    private Double area;
    private String ownerName;

    private LandRegistryRequest landRegistry;

    private OwnershipRequest ownership;

    private LegalRecordRequest legalRecord;

    private ZoningRequest zoning;
    private FloodZoneRequest floodZone;

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
}
