package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComparablePropertyResponse {

    private Long id;
    private String title;
    private String city;
    private String propertyType;
    private Double area;
    private Double price;
    private Double pricePerSqFt;

}