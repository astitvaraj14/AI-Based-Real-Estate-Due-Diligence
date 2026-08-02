package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValuationComparisonResponse {

    private Long propertyId;

    private String propertyTitle;

    private Double propertyPrice;

    private Double estimatedMarketValue;

    private Double priceDifference;

    private Double percentageDifference;

    private String valuationStatus;
}