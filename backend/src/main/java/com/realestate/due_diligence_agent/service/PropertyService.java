package com.realestate.due_diligence_agent.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.realestate.due_diligence_agent.dto.AddressValidationResponse;
import com.realestate.due_diligence_agent.exception.BadRequestException;
import com.realestate.due_diligence_agent.exception.ResourceNotFoundException;
import com.realestate.due_diligence_agent.dto.EnvironmentalResponse;
import com.realestate.due_diligence_agent.dto.FloodZoneResponse;
import com.realestate.due_diligence_agent.dto.LandRegistryResponse;
import com.realestate.due_diligence_agent.dto.LegalRecordResponse;
import com.realestate.due_diligence_agent.dto.OwnershipResponse;
import com.realestate.due_diligence_agent.dto.PermitResponse;
import com.realestate.due_diligence_agent.dto.PropertyDetailsResponse;
import com.realestate.due_diligence_agent.dto.PropertyRequest;
import com.realestate.due_diligence_agent.dto.VerificationResult;
import com.realestate.due_diligence_agent.dto.ZoningResponse;
import com.realestate.due_diligence_agent.entity.Property;
import com.realestate.due_diligence_agent.entity.Role;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.PropertyRepository;

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
    private final PermitService permitService;
private final EnvironmentalService environmentalService;

    public PropertyService(PropertyRepository propertyRepository,
            AddressValidationService addressValidationService,
            VerificationService verificationService,
            LandRegistryService landRegistryService,
            OwnershipService ownershipService, LegalRecordService legalRecordService,
                           ZoningService zoningService,
FloodZoneService floodZoneService,
PermitService permitService,
EnvironmentalService environmentalService     ) {

        this.propertyRepository = propertyRepository;
        this.addressValidationService = addressValidationService;
        this.verificationService = verificationService;
        this.landRegistryService = landRegistryService;
        this.ownershipService = ownershipService;
        this.legalRecordService = legalRecordService;
        this.zoningService = zoningService;
        this.floodZoneService = floodZoneService;
        this.permitService = permitService;
        this.environmentalService = environmentalService;

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
    @Transactional
    public Property addProperty(PropertyRequest request) {

        AddressValidationResponse validation
                = addressValidationService.validateAddress(request.getAddress(), request.getCity(), request.getState());

        if (!validation.isValid()) {
            throw new BadRequestException(validation.getMessage());
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
        property.setLatitude(validation.getLatitude());
        property.setLongitude(validation.getLongitude());

        property.setUser(loggedInUser);

        property.setVerificationStatus("Pending");
        property.setVerificationScore(null);
        property.setRegistrationDate(LocalDate.now());
        property.setVerificationDate(null);

        // Every due-diligence section the seller filled in on Add Property is
        // attached to the property here. Property is the cascade root, so
        // saving it below persists all of these child rows in one go.
        if (request.getLandRegistry() != null) {
            property.setLandRegistry(
                    landRegistryService.buildFromRequest(request.getLandRegistry(), property));
        }
        if (request.getOwnership() != null) {
            property.setOwnership(
                    ownershipService.buildFromRequest(request.getOwnership(), property));
        }
        if (request.getLegalRecord() != null) {
            property.setLegalRecord(
                    legalRecordService.buildFromRequest(request.getLegalRecord(), property));
        }
        if (request.getZoning() != null) {
            property.setZoning(
                    zoningService.buildFromRequest(request.getZoning(), property));
        }
        if (request.getFloodZone() != null) {
            property.setFloodZone(
                    floodZoneService.buildFromRequest(request.getFloodZone(), property));
        }
        if (request.getPermit() != null) {
            property.setPermit(
                    permitService.buildFromRequest(request.getPermit(), property));
        }
        if (request.getEnvironmental() != null) {
            property.setEnvironmental(
                    environmentalService.buildFromRequest(request.getEnvironmental(), property));
        }

        return propertyRepository.save(property);
    }

    // ==========================================
    // Verify Property
    // ==========================================
    @Transactional
    public VerificationResult verifyProperty(Long propertyId) {

        User loggedInUser = getLoggedInUser();

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (!property.getUser().getId().equals(loggedInUser.getId()) && loggedInUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Access denied");
        }

        VerificationResult result = verificationService.verify(property);

        property.setVerificationScore(result.getScore());
        property.setVerificationStatus(result.getStatus());
        property.setVerificationDate(LocalDate.now());

        propertyRepository.save(property);

        return result;
    }

    // ==========================================
    // Update Property Status (Admin Only)
    // ==========================================
    @Transactional
    public Property updatePropertyStatus(Long id, Map<String, Object> request) {
        User user = getLoggedInUser();
        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Only Admins can manually update property status.");
        }

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        String status = (String) request.get("status");
        Double score = null;
        if (request.get("score") instanceof Integer) {
            score = ((Integer) request.get("score")).doubleValue();
        } else if (request.get("score") instanceof Double) {
            score = (Double) request.get("score");
        } else if (request.get("score") instanceof String) {
            score = Double.parseDouble((String) request.get("score"));
        }

        if (status != null) property.setVerificationStatus(status);
        if (score != null) property.setVerificationScore(score);
        property.setVerificationDate(LocalDate.now());

        return propertyRepository.save(property);
    }

    // ==========================================
    // Get All Properties
    // ==========================================
    public List<Property> getAllProperties() {
        User user = getLoggedInUser();
        if (user.getRole() == Role.ADMIN) {
            return propertyRepository.findAll();
        }
        return propertyRepository.findByUser(user);
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
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        System.out.println("Property ID       : " + property.getId());
        if (property.getUser() != null) {
            System.out.println("Property Owner ID : " + property.getUser().getId());
            System.out.println("Property Owner    : " + property.getUser().getEmail());
        }

        if (user.getRole() != Role.ADMIN) {
            if (property.getUser() == null || !property.getUser().getId().equals(user.getId())) {
                System.out.println("ACCESS DENIED");
                throw new AccessDeniedException("Access denied");
            }
        }

        System.out.println("ACCESS GRANTED");

        return property;
    }

    // ==========================================
    // Update Property
    // ==========================================
    @Transactional
    public Property updateProperty(Long id, PropertyRequest request) {

        User user = getLoggedInUser();

        Property property;
        if (user.getRole() == Role.ADMIN) {
            property = propertyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        } else {
            property = propertyRepository.findByIdAndUser(id, user).orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        }

        AddressValidationResponse validation
                = addressValidationService.validateAddress(request.getAddress(), request.getCity(), request.getState());

        if (!validation.isValid()) {
            throw new BadRequestException(validation.getMessage());
        }

        property.setTitle(request.getTitle());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPropertyType(request.getPropertyType());
        property.setPrice(request.getPrice());
        property.setArea(request.getArea());
        property.setOwnerName(request.getOwnerName());
        
        if (validation.getLatitude() != null && validation.getLongitude() != null) {
            property.setLatitude(validation.getLatitude());
            property.setLongitude(validation.getLongitude());
        }

        // A section is only touched when it is present in the request body.
        // When present, an existing child row is updated in place; only a
        // brand-new section creates a new row. This is what keeps Edit
        // Property from ever inserting duplicate due-diligence records.
        if (request.getLandRegistry() != null) {
            if (property.getLandRegistry() == null) {
                property.setLandRegistry(
                        landRegistryService.buildFromRequest(request.getLandRegistry(), property));
            } else {
                landRegistryService.applyRequest(property.getLandRegistry(), request.getLandRegistry());
            }
        }
        if (request.getOwnership() != null) {
            if (property.getOwnership() == null) {
                property.setOwnership(
                        ownershipService.buildFromRequest(request.getOwnership(), property));
            } else {
                ownershipService.applyRequest(property.getOwnership(), request.getOwnership());
            }
        }
        if (request.getLegalRecord() != null) {
            if (property.getLegalRecord() == null) {
                property.setLegalRecord(
                        legalRecordService.buildFromRequest(request.getLegalRecord(), property));
            } else {
                legalRecordService.applyRequest(property.getLegalRecord(), request.getLegalRecord());
            }
        }
        if (request.getZoning() != null) {
            if (property.getZoning() == null) {
                property.setZoning(
                        zoningService.buildFromRequest(request.getZoning(), property));
            } else {
                zoningService.applyRequest(property.getZoning(), request.getZoning());
            }
        }
        if (request.getFloodZone() != null) {
            if (property.getFloodZone() == null) {
                property.setFloodZone(
                        floodZoneService.buildFromRequest(request.getFloodZone(), property));
            } else {
                floodZoneService.applyRequest(property.getFloodZone(), request.getFloodZone());
            }
        }
        if (request.getPermit() != null) {
            if (property.getPermit() == null) {
                property.setPermit(
                        permitService.buildFromRequest(request.getPermit(), property));
            } else {
                permitService.applyRequest(property.getPermit(), request.getPermit());
            }
        }
        if (request.getEnvironmental() != null) {
            if (property.getEnvironmental() == null) {
                property.setEnvironmental(
                        environmentalService.buildFromRequest(request.getEnvironmental(), property));
            } else {
                environmentalService.applyRequest(property.getEnvironmental(), request.getEnvironmental());
            }
        }

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
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (property.getUser() != null) {
            System.out.println("Property Owner : " + property.getUser().getEmail());
        }

        if (user.getRole() != Role.ADMIN) {
            if (property.getUser() == null || !property.getUser().getId().equals(user.getId())) {
                throw new AccessDeniedException("Access denied");
            }
        }

        propertyRepository.delete(property);

        System.out.println("Property Deleted Successfully");
    }

    // ==========================================
    // Filter by City
    // ==========================================
    public List<Property> getPropertiesByCity(String city) {

        User user = getLoggedInUser();
        List<Property> properties = user.getRole() == Role.ADMIN ? propertyRepository.findAll() : propertyRepository.findByUser(user);
        return properties
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

        User user = getLoggedInUser();
        List<Property> properties = user.getRole() == Role.ADMIN ? propertyRepository.findAll() : propertyRepository.findByUser(user);
        return properties
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

        User user = getLoggedInUser();
        List<Property> properties = user.getRole() == Role.ADMIN ? propertyRepository.findAll() : propertyRepository.findByUser(user);
        return properties
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

        User user = getLoggedInUser();
        List<Property> properties = user.getRole() == Role.ADMIN ? propertyRepository.findAll() : propertyRepository.findByUser(user);
        return properties
                .stream()
                .collect(Collectors.groupingBy(
                        Property::getPropertyType,
                        Collectors.counting()));
    }
    //=========================
    //get property by id
    //=========================

    @Transactional(readOnly = true)
    public PropertyDetailsResponse getPropertyDetailsById(Long id) {

        User loggedInUser = getLoggedInUser();

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        if (loggedInUser.getRole() != Role.ADMIN) {
            if (property.getUser() == null || !property.getUser().getId().equals(loggedInUser.getId())) {
                throw new AccessDeniedException("Access denied");
            }
        }

        // Every section below is read straight off the Property entity that
        // was just loaded from PostgreSQL — no mock/generated values.
        LandRegistryResponse landRegistry =
                landRegistryService.getRegistryDetails(property);

        OwnershipResponse ownership =
                ownershipService.getOwnershipDetails(property);

        LegalRecordResponse legalRecord =
                legalRecordService.getLegalRecord(property);

        ZoningResponse zoning =
                zoningService.getZoning(property);

        FloodZoneResponse floodZone =
                floodZoneService.getFloodZone(property);

        PermitResponse permit =
                permitService.getPermit(property);

        EnvironmentalResponse environmental =
                environmentalService.getEnvironmental(property);

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
                floodZone,
                permit,
                environmental
        );
    }
}