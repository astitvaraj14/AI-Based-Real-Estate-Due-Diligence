package com.realestate.due_diligence_agent.service;

public interface EmailService {

    void sendOtpEmail(String toEmail, String otp);

}