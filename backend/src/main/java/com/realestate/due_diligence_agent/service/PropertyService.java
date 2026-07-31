package com.realestate.due_diligence_agent.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.dto.AddressValidationResponse;
import com.realestate.due_diligence_agent.dto.PropertyRequest;
import com.realestate.due_diligence_agent.dto.VerificationResult;
import com.realestate.due_diligence_agent.dto.LandRegistryResponse;
import com.realestate.due_diligence_agent.dto.OwnershipResponse;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.PropertyRepository;
import com.realestate.due_diligence_agent.dto.PropertyDetailsResponse;
import com.realestate.due_diligence_agent.dto.ZoningResponse;
import com.realestate.due_diligence_agent.dto.LegalRecordResponse;
import com.realestate.due_diligence_agent.dto.FloodZoneResponse;
import com.realestate.due_diligence_agent.entity.LandRegistry;
import com.realestate.due_diligence_agent.repository.LandRegistryRepository;
import com.realestate.due_diligence_agent.repository.OwnershipRepository;
import com.realestate.due_diligence_agent.entity.Ownership;
import com.realestate.due_diligence_agent.entity.LegalRecord;
import com.realestate.due_diligence_agent.repository.LegalRecordRepository;
import com.realestate.due_diligence_agent.repository.ZoningRepository;
import com.realestate.due_diligence_agent.entity.Zoning;
import com.realestate.due_diligence_agent.repository.FloodZoneRepository;
import com.realestate.due_diligence_agent.entity.FloodZone;










@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final AddressValidationService addressValidationService;
    private final VerificationService verificationService;
    private final LandRegistryService landRegistryService;
    private final OwnershipService ownershipService;
    private final LegalRecordService legalRecordService;
    private final ZoningService zoningService;
    private final FloodZoneService floodZoneService;
    private final LandRegistryRepository landRegistryRepository;
    private final OwnershipRepository ownershipRepository;
    private final LegalRecordRepository legalRecordRepository;
    private final ZoningRepository zoningRepository;
    private final FloodZoneRepository floodZoneRepository;

    public PropertyService(PropertyRepository propertyRepository,
            AddressValidationService addressValidationService,
            VerificationService verificationService,
            LandRegistryService landRegistryService,
            OwnershipService ownershipService, LegalRecordService legalRecordService,
                           ZoningService zoningService, FloodZoneService floodZoneService,
                           LandRegistryRepository landRegistryRepository,
                           OwnershipRepository ownershipRepository, LegalRecordRepository legalRecordRepository, ZoningRepository zoningRepository, FloodZoneRepository floodZoneRepository) {

        this.propertyRepository = propertyRepository;
        this.addressValidationService = addressValidationService;
        this.verificationService = verificationService;
        this.landRegistryService = landRegistryService;
        this.ownershipService = ownershipService;
        this.legalRecordService = legalRecordService;
        this.zoningService = zoningService;
        this.floodZoneService = floodZoneService;
        this.landRegistryRepository = landRegistryRepository;
        this.ownershipRepository = ownershipRepository;
        this.legalRecordRepository = legalRecordRepository;
        this.zoningRepository = zoningRepository;
        this.floodZoneRepository = floodZoneRepository;

    }

    // ==========================================
    // Get Logged In User
    // ==========================================
    private User getLoggedInUser() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    // ==========================================
    // Add Property
    // ==========================================
    public Property addProperty(PropertyRequest request) {

        AddressValidationResponse validation
                = addressValidationService.validateAddress(request.getAddress());

        if (!validation.isValid()) {
            throw new RuntimeException(validation.getMessage());
        }

        User loggedInUser = getLoggedInUser();

        Property property = new Property();

        property.setTitle(request.getTitle());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPropertyType(request.getPropertyType());
        property.setPrice(request.getPrice());
        property.setArea(request.getArea());
        property.setOwnerName(request.getOwnerName());

        property.setUser(loggedInUser);

        property.setVerificationStatus("Pending");
        property.setVerificationScore(0.0);
        property.setRegistrationDate(LocalDate.now());
        property.setVerificationDate(null);

        Property savedProperty = propertyRepository.save(property);
        if (request.getLandRegistry() != null) {
            LandRegistry landRegistry = new LandRegistry();

            landRegistry.setRegistryNumber(
                    request.getLandRegistry().getRegistryNumber());

            landRegistry.setRegistryStatus(
                    request.getLandRegistry().getRegistryStatus());

            landRegistry.setRegistryOffice(
                    request.getLandRegistry().getRegistryOffice());

            landRegistry.setTitleVerified(
                    request.getLandRegistry().getTitleVerified());

            landRegistry.setLastUpdated(
                    request.getLandRegistry().getLastUpdated());

            landRegistry.setProperty(savedProperty);
            landRegistryRepository.save(landRegistry);        }

        if (request.getOwnership() != null) {

            Ownership ownership = new Ownership();

            ownership.setOwnerName(
                    request.getOwnership().getOwnerName());

            ownership.setOwnerVerified(
                    request.getOwnership().getOwnerVerified());

            ownership.setOwnershipType(
                    request.getOwnership().getOwnershipType());

            ownership.setOwnershipSince(
                    request.getOwnership().getOwnershipSince());

            ownership.setRemarks(
                    request.getOwnership().getRemarks());

            ownership.setProperty(savedProperty);

            ownershipRepository.save(ownership);
        }
        if (request.getLegalRecord() != null) {

            LegalRecord legalRecord = new LegalRecord();

            legalRecord.setCourtCases(
                    request.getLegalRecord().getCourtCases());

            legalRecord.setCaseStatus(
                    request.getLegalRecord().getCaseStatus());

            legalRecord.setRemarks(
                    request.getLegalRecord().getRemarks());

            legalRecord.setProperty(savedProperty);

            legalRecordRepository.save(legalRecord);
        }
        if (request.getZoning() != null) {

            Zoning zoning = new Zoning();

            zoning.setZoneType(
                    request.getZoning().getZoneType());

            zoning.setConstructionAllowed(
                    request.getZoning().getConstructionAllowed());

            zoning.setAuthority(
                    request.getZoning().getAuthority());

            zoning.setProperty(savedProperty);

            zoningRepository.save(zoning);
        }
        if (request.getFloodZone() != null) {

            FloodZone floodZone = new FloodZone();

            floodZone.setZoneType(
                    request.getFloodZone().getZoneType());

            floodZone.setRiskLevel(
                    request.getFloodZone().getRiskLevel());

            floodZone.setInsuranceRequired(
                    request.getFloodZone().getInsuranceRequired());

            floodZone.setAuthority(
                    request.getFloodZone().getAuthority());

            floodZone.setProperty(savedProperty);

            floodZoneRepository.save(floodZone);
        }
        return savedProperty;

    }

    // ==========================================
    // Verify Property
    // ==========================================
    public VerificationResult verifyProperty(Long propertyId) {

        User loggedInUser = getLoggedInUser();

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getUser().getId().equals(loggedInUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        VerificationResult result = verificationService.verify(property);

        property.setVerificationScore(result.getScore());
        property.setVerificationStatus(result.getStatus());
        property.setVerificationDate(LocalDate.now());

        propertyRepository.save(property);

        return result;
    }

    // ==========================================
    // Get All Properties
    // ==========================================
    public List<Property> getAllProperties() {
        return propertyRepository.findByUser(getLoggedInUser());
    }

    // ==========================================
    // Get Property By Id
    // ==========================================
    public Property getPropertyById(Long id) {

        User user = getLoggedInUser();

        System.out.println("========== GET PROPERTY ==========");
        System.out.println("Logged In User ID : " + user.getId());
        System.out.println("Logged In Email   : " + user.getEmail());

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        System.out.println("Property ID       : " + property.getId());
        System.out.println("Property Owner ID : " + property.getUser().getId());
        System.out.println("Property Owner    : " + property.getUser().getEmail());

        if (!property.getUser().getId().equals(user.getId())) {
            System.out.println("ACCESS DENIED");
            throw new RuntimeException("Access denied");
        }

        System.out.println("ACCESS GRANTED");

        return property;
    }

    // ==========================================
    // Update Property
    // ==========================================
    public Property updateProperty(Long id, PropertyRequest request) {

        User user = getLoggedInUser();

        Property property = propertyRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        AddressValidationResponse validation
                = addressValidationService.validateAddress(request.getAddress());

        if (!validation.isValid()) {
            throw new RuntimeException(validation.getMessage());
        }

        property.setTitle(request.getTitle());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPropertyType(request.getPropertyType());
        property.setPrice(request.getPrice());
        property.setArea(request.getArea());
        property.setOwnerName(request.getOwnerName());

        return propertyRepository.save(property);
    }

    // ==========================================
    // Delete Property
    // ==========================================
    public void deleteProperty(Long id) {

        User user = getLoggedInUser();

        System.out.println("========== DELETE PROPERTY ==========");
        System.out.println("Logged In User : " + user.getEmail());

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        System.out.println("Property Owner : " + property.getUser().getEmail());

        if (!property.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        propertyRepository.delete(property);

        System.out.println("Property Deleted Successfully");
    }

    // ==========================================
    // Filter by City
    // ==========================================
    public List<Property> getPropertiesByCity(String city) {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .filter(property
                        -> property.getCity() != null
                && property.getCity().equalsIgnoreCase(city))
                .toList();
    }

    // ==========================================
    // Filter by Property Type
    // ==========================================
    public List<Property> getPropertiesByType(String propertyType) {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .filter(property
                        -> property.getPropertyType() != null
                && property.getPropertyType().equalsIgnoreCase(propertyType))
                .toList();
    }

    // ==========================================
    // Filter by Price
    // ==========================================
    public List<Property> getPropertiesByPrice(Double minPrice,
            Double maxPrice) {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .filter(property
                        -> property.getPrice() != null
                && property.getPrice() >= minPrice
                && property.getPrice() <= maxPrice)
                .toList();
    }

    // ==========================================
    // Property Statistics
    // ==========================================
    public Map<String, Long> getPropertyTypeStats() {

        return propertyRepository.findByUser(getLoggedInUser())
                .stream()
                .collect(Collectors.groupingBy(
                        Property::getPropertyType,
                        Collectors.counting()));
    }
    //=========================
    //get property by id
    //=========================

    public PropertyDetailsResponse getPropertyDetailsById(Long id) {

        User loggedInUser = getLoggedInUser();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (!property.getUser().getId().equals(loggedInUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        LandRegistryResponse landRegistry =
                landRegistryService.getRegistryDetails(property);

        LegalRecordResponse legalRecord =
                legalRecordService.getLegalRecord(property);

        ZoningResponse zoning =
                zoningService.getZoning(property);Zoning zoningEntity = new Zoning();

        FloodZoneResponse floodZone =
                floodZoneService.getFloodZone(property);

        OwnershipResponse ownership =
                ownershipService.getOwnershipDetails(property);


        return new PropertyDetailsResponse(
                property.getId(),
                property.getTitle(),
                property.getAddress(),
                property.getCity(),
                property.getState(),
                property.getPropertyType(),
                property.getPrice(),
                property.getArea(),
                property.getOwnerName(),
                property.getVerificationStatus(),
                property.getVerificationScore(),
                property.getRegistrationDate(),
                property.getVerificationDate(),
                landRegistry,
                ownership,
                legalRecord,
                zoning,
                floodZone
        );
    }
}
