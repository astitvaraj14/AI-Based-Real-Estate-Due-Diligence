package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.realestate.due_diligence_agent.entity.OtpToken;

public interface OtpRepository extends JpaRepository<OtpToken, Long> {

    Optional<OtpToken> findByEmail(String email);

    Optional<OtpToken> findByEmailAndOtp(String email, String otp);

    @Transactional
    @Modifying
    void deleteByEmail(String email);
}