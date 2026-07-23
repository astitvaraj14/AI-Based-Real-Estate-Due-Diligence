package com.realestate.due_diligence_agent.dto;

public class GoogleLoginRequest {

    private String token;

    public GoogleLoginRequest() {
    }

    public GoogleLoginRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}