package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realestate.due_diligence_agent.entity.MobileOtpToken;

@Repository
public interface MobileOtpRepository
        extends JpaRepository<MobileOtpToken, Long> {

    Optional<MobileOtpToken> findByMobileNumber(String mobileNumber);

    void deleteByMobileNumber(String mobileNumber);
}