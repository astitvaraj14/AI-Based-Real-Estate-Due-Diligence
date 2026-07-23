package com.realestate.due_diligence_agent.dto;

public class VerifyMobileOtpRequest {

    private String mobileNumber;
    private String otp;

    public VerifyMobileOtpRequest() {
    }

    public VerifyMobileOtpRequest(String mobileNumber, String otp) {
        this.mobileNumber = mobileNumber;
        this.otp = otp;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}