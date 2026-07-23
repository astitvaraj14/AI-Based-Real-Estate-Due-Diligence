package com.realestate.due_diligence_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.realestate.due_diligence_agent.entity.OtpToken;

@Repository
public interface OtpRepository extends JpaRepository<OtpToken, Long> {

    Optional<OtpToken> findByEmail(String email);

    @Transactional
    @Modifying
    void deleteByEmail(String email);
}