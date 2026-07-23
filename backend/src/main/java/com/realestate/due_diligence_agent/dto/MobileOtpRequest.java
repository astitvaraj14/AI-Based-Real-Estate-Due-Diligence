package com.realestate.due_diligence_agent.dto;

public class MobileOtpRequest {

    private String mobileNumber;

    public MobileOtpRequest() {
    }

    public MobileOtpRequest(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}