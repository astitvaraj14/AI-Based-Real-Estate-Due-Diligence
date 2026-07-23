package com.realestate.due_diligence_agent.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.realestate.due_diligence_agent.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("astitvarajfbg@gmail.com");   // Your Gmail

        message.setTo(toEmail);

        message.setSubject("Password Reset OTP");

        message.setText(
                "Dear User,\n\n" +
                "Your One-Time Password (OTP) for resetting your password is:\n\n" +
                otp +
                "\n\nThis OTP is valid for 10 minutes.\n\n" +
                "If you did not request a password reset, please ignore this email.\n\n" +
                "Regards,\n" +
                "Real Estate Due Diligence Platform"
        );

        mailSender.send(message);
    }
}