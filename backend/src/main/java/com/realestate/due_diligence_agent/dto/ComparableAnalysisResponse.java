package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComparableAnalysisResponse {

    private Long propertyId;

    private String propertyTitle;

    private Double propertyPrice;

    private Double propertyArea;

    private Double averageComparablePrice;

    private Double averagePricePerSqFt;

    private Integer totalComparables;

    private List<ComparablePropertyResponse> comparableProperties;
}