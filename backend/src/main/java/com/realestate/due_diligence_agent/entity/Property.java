package com.realestate.due_diligence_agent.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String address;

    private String city;

    private String state;

    private String propertyType;

    private Double price;

    private Double area;

    private String ownerName;

    private Double latitude;

    private Double longitude;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // One Property -> Many Tax History Records
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<PropertyTaxHistory> taxHistory;

    // Verification Details
    private String verificationStatus;

    private Double verificationScore;

    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String aiReport;

    private LocalDate registrationDate;

    private LocalDate verificationDate;

    // Due-diligence child records. Property is the owning aggregate: it
    // cascades all persistence operations to its children and removes a
    // child row if it is ever detached (orphanRemoval), so there is never a
    // duplicate/orphaned due-diligence row for a property.
    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private LandRegistry landRegistry;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Ownership ownership;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private LegalRecord legalRecord;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Zoning zoning;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private FloodZone floodZone;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Permit permit;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Environmental environmental;

    public Property() {
    }

    public Property(Long id, String title, String address, String city,
                    String state, String propertyType,
                    Double price, Double area, String ownerName,
                    User user,
                    String verificationStatus,
                    Double verificationScore,
                    LocalDate registrationDate,
                    LocalDate verificationDate) {

        this.id = id;
        this.title = title;
        this.address = address;
        this.city = city;
        this.state = state;
        this.propertyType = propertyType;
        this.price = price;
        this.area = area;
        this.ownerName = ownerName;
        this.user = user;
        this.verificationStatus = verificationStatus;
        this.verificationScore = verificationScore;
        this.registrationDate = registrationDate;
        this.verificationDate = verificationDate;
    }

    // Getters and Setters

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<PropertyTaxHistory> getTaxHistory() {
        return taxHistory;
    }

    public void setTaxHistory(List<PropertyTaxHistory> taxHistory) {
        this.taxHistory = taxHistory;
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

    public String getAiReport() {
        return aiReport;
    }

    public void setAiReport(String aiReport) {
        this.aiReport = aiReport;
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

    public LandRegistry getLandRegistry() {
        return landRegistry;
    }

    public void setLandRegistry(LandRegistry landRegistry) {
        this.landRegistry = landRegistry;
    }

    public Ownership getOwnership() {
        return ownership;
    }

    public void setOwnership(Ownership ownership) {
        this.ownership = ownership;
    }

    public LegalRecord getLegalRecord() {
        return legalRecord;
    }

    public void setLegalRecord(LegalRecord legalRecord) {
        this.legalRecord = legalRecord;
    }

    public Zoning getZoning() {
        return zoning;
    }

    public void setZoning(Zoning zoning) {
        this.zoning = zoning;
    }

    public FloodZone getFloodZone() {
        return floodZone;
    }

    public void setFloodZone(FloodZone floodZone) {
        this.floodZone = floodZone;
    }

    public Permit getPermit() {
        return permit;
    }

    public void setPermit(Permit permit) {
        this.permit = permit;
    }

    public Environmental getEnvironmental() {
        return environmental;
    }

    public void setEnvironmental(Environmental environmental) {
        this.environmental = environmental;
    }
}