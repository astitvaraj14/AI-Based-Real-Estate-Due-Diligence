package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Seller-submitted Zoning section of the Add/Edit Property form.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ZoningRequest {

    private String zoneType;
    private String constructionAllowed;
    private String authority;
}