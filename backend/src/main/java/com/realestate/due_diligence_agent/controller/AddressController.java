package com.realestate.due_diligence_agent.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.due_diligence_agent.dto.AddressValidationResponse;
import com.realestate.due_diligence_agent.service.AddressValidationService;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final AddressValidationService validationService;

    public AddressController(AddressValidationService validationService) {
        this.validationService = validationService;
    }

    @GetMapping("/validate")
    public AddressValidationResponse validate(
            @RequestParam String address) {

        return validationService.validateAddress(address);
    }
}
