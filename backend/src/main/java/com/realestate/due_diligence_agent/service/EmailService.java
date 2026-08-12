package com.realestate.due_diligence_agent.service;

public interface EmailService {

    void sendOtp(String toEmail, String otp);
    void sendReportWithAttachment(String toEmail, String subject, String body, byte[] attachmentData, String attachmentName, String mimeType);

}