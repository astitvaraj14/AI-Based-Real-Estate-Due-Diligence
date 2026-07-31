package com.realestate.due_diligence_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ZoningRequest{

    private String zoneType;
    private String constructionAllowed;
    private String authority;
}