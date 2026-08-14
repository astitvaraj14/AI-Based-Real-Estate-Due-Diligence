package com.realestate.due_diligence_agent.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.List;
import java.util.Base64;
import java.util.HashMap;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${spring.mail.username}") // your verified gmail address
    private String senderEmail;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

    @Override
    public void sendOtp(String toEmail, String otp) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.set("api-key", brevoApiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("sender", Map.of("name", "Real Estate AI", "email", senderEmail));
        body.put("to", List.of(Map.of("email", toEmail)));
        body.put("subject", "Password Reset OTP");
        body.put("textContent", "Your OTP for password reset is: " + otp + "\n\nThis OTP is valid for 10 minutes.");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(BREVO_API_URL, request, String.class);
            System.out.println("Brevo API response: " + response.getBody());
        } catch (Exception e) {
            System.err.println("Failed to send OTP via Brevo: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void sendReportWithAttachment(String toEmail, String subject, String bodyText, byte[] attachmentData, String attachmentName, String mimeType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.set("api-key", brevoApiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("sender", Map.of("name", "Real Estate AI", "email", senderEmail));
        body.put("to", List.of(Map.of("email", toEmail)));
        body.put("subject", subject);
        body.put("textContent", bodyText);

        String base64Content = Base64.getEncoder().encodeToString(attachmentData);
        body.put("attachment", List.of(Map.of(
                "name", attachmentName,
                "content", base64Content
        )));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(BREVO_API_URL, request, String.class);
            System.out.println("Brevo API response (attachment): " + response.getBody());
        } catch (Exception e) {
            System.err.println("Failed to send report via Brevo: " + e.getMessage());
            e.printStackTrace();
        }
    }
}