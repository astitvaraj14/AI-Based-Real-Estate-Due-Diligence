package com.realestate.due_diligence_agent.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.realestate.due_diligence_agent.dto.AuthResponse;
import com.realestate.due_diligence_agent.dto.ChangePasswordRequest;
import com.realestate.due_diligence_agent.dto.ChooseRoleRequest;
import com.realestate.due_diligence_agent.dto.ForgotPasswordRequest;
import com.realestate.due_diligence_agent.dto.GoogleLoginRequest;
import com.realestate.due_diligence_agent.dto.LoginRequest;
import com.realestate.due_diligence_agent.dto.MobileOtpRequest;
import com.realestate.due_diligence_agent.dto.MobileOtpVerifyRequest;
import com.realestate.due_diligence_agent.dto.RegisterRequest;
import com.realestate.due_diligence_agent.dto.ResetPasswordRequest;
import com.realestate.due_diligence_agent.dto.UpdateProfileRequest;
import com.realestate.due_diligence_agent.dto.VerifyOtpRequest;
import com.realestate.due_diligence_agent.entity.MobileOtpToken;
import com.realestate.due_diligence_agent.entity.OtpToken;
import com.realestate.due_diligence_agent.entity.User;
import com.realestate.due_diligence_agent.repository.MobileOtpRepository;
import com.realestate.due_diligence_agent.repository.OtpRepository;
import com.realestate.due_diligence_agent.repository.UserRepository;
import com.realestate.due_diligence_agent.security.JwtService;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final OtpRepository otpRepository;
    private final MobileOtpRepository mobileOtpRepository;
    @Value("${google.client.id}")
private String googleClientId;

public UserService(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder,
    JwtService jwtService,
    EmailService emailService,
    OtpRepository otpRepository,
    MobileOtpRepository mobileOtpRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.otpRepository = otpRepository;
        this.mobileOtpRepository = mobileOtpRepository;
    }

    // ==========================
    // Register
    // ==========================
    public User register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();

        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        user.setMobileNumber(request.getMobileNumber());
        user.setMobileVerified(false);

        return userRepository.save(user);
    }


    // ==========================
// Select Role (Google Login)
// ==========================
public AuthResponse selectRole(ChooseRoleRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole() != null) {
        throw new RuntimeException("Role already selected");
    }

    user.setRole(request.getRole());

    userRepository.save(user);

    String jwt = jwtService.generateToken(user.getEmail());

    return new AuthResponse(
            jwt,
            user.getEmail(),
            user.getRole().name(),
            false
    );
}

    // ==========================
    // Login
    // ==========================
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
            token,
            user.getEmail(),
            user.getRole().name(),
            false
    );
    }

    public void sendMobileOtp(MobileOtpRequest request) {

    User user = userRepository.findByMobileNumber(request.getMobileNumber())
            .orElseThrow(() -> new RuntimeException("Mobile number not registered"));

    mobileOtpRepository.findByMobileNumber(user.getMobileNumber())
            .ifPresent(mobileOtpRepository::delete);

    String otp = String.format("%06d", new java.util.Random().nextInt(999999));

    MobileOtpToken token = new MobileOtpToken();
    token.setMobileNumber(user.getMobileNumber());
    token.setOtp(otp);
    token.setExpiryTime(java.time.LocalDateTime.now().plusMinutes(5));

    mobileOtpRepository.save(token);

    System.out.println("\\n==============================");
    System.out.println("MOBILE OTP : " + otp);
    System.out.println("==============================\\n");
}

// ==========================
// Verify Mobile OTP
// ==========================
@Transactional
public AuthResponse verifyMobileOtp(MobileOtpVerifyRequest request) {

    MobileOtpToken token = mobileOtpRepository
            .findByMobileNumber(request.getMobileNumber())
            .orElseThrow(() -> new RuntimeException("OTP not found"));

    if (!token.getOtp().equals(request.getOtp())) {
        throw new RuntimeException("Invalid OTP");
    }

    if (token.getExpiryTime().isBefore(LocalDateTime.now())) {
        throw new RuntimeException("OTP Expired");
    }

    User user = userRepository.findByMobileNumber(request.getMobileNumber())
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setMobileVerified(true);
    userRepository.save(user);

    // Delete using entity
    mobileOtpRepository.delete(token);

    String jwt = jwtService.generateToken(user.getEmail());

    return new AuthResponse(
            jwt,
            user.getEmail(),
            user.getRole().name(),
            false
    );
}

    // ==========================
// Google Login
// ==========================
public AuthResponse googleLogin(GoogleLoginRequest request)
throws GeneralSecurityException, IOException {

System.out.println("\n========== GOOGLE LOGIN ==========");
System.out.println("Received Token:");
System.out.println(request.getToken());

System.out.println("\nConfigured Client ID:");
System.out.println(googleClientId);

GoogleIdTokenVerifier verifier =
    new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            GsonFactory.getDefaultInstance())
            .setAudience(Collections.singletonList(googleClientId))
            .build();

System.out.println("\nVerifying Google Token...");

GoogleIdToken idToken = verifier.verify(request.getToken());

if (idToken == null) {
System.out.println("❌ Google Token Verification Failed!");
throw new RuntimeException("Invalid Google Token");
}

System.out.println("✅ Google Token Verified Successfully");

GoogleIdToken.Payload payload = idToken.getPayload();

String email = payload.getEmail();
String name = (String) payload.get("name");
String picture = (String) payload.get("picture");
String googleId = payload.getSubject();

System.out.println("\n========== GOOGLE USER ==========");
System.out.println("Email      : " + email);
System.out.println("Name       : " + name);
System.out.println("Google ID  : " + googleId);
System.out.println("Picture    : " + picture);

User user = userRepository.findByEmail(email).orElse(null);

// First Time Google Login
if (user == null) {

System.out.println("\nNew Google User. Creating account...");

user = new User();
user.setEmail(email);
user.setFullName(name);
user.setGoogleId(googleId);
user.setProfilePicture(picture);
user.setProvider("GOOGLE");

userRepository.save(user);

System.out.println("User saved successfully.");

return new AuthResponse(
        "",
        email,
        null,
        true
);
}

// Existing user but role not selected
if (user.getRole() == null) {

System.out.println("User exists but role not selected.");

return new AuthResponse(
        "",
        email,
        null,
        true
);
}

System.out.println("Existing Google User.");

String jwt = jwtService.generateToken(email);

System.out.println("JWT Generated Successfully");

return new AuthResponse(
    jwt,
    email,
    user.getRole().name(),
    false
);
}

    // ==========================
    // Forgot Password
    // ==========================
    public void forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not registered"));

        otpRepository.findByEmail(user.getEmail())
                .ifPresent(otpRepository::delete);

        String otp = String.format("%06d", new Random().nextInt(999999));

        OtpToken token = new OtpToken();
        token.setEmail(user.getEmail());
        token.setOtp(otp);
        token.setExpiryTime(LocalDateTime.now().plusMinutes(10));

        otpRepository.save(token);

        emailService.sendOtpEmail(user.getEmail(), otp);
    }

    // ==========================
    // Verify OTP
    // ==========================
    public void verifyOtp(VerifyOtpRequest request) {

        OtpToken token = otpRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (!token.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (token.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }
    }


// Reset Password
// ==========================
@Transactional
public void resetPassword(ResetPasswordRequest request) {

    verifyOtp(new VerifyOtpRequest(
            request.getEmail(),
            request.getOtp()
    ));

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

    userRepository.save(user);

    otpRepository.deleteByEmail(request.getEmail());
}

    // ==========================
    // Logged In User
    // ==========================
    public User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    // ==========================
    // Update Profile
    // ==========================
    public User updateProfile(UpdateProfileRequest request) {

        User user = getLoggedInUser();

        userRepository.findByEmail(request.getEmail())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(user.getId())) {
                        throw new RuntimeException("Email already exists");
                    }
                });

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        return userRepository.save(user);
    }

    // ==========================
    // Change Password
    // ==========================
    public void changePassword(ChangePasswordRequest request) {

        User user = getLoggedInUser();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

}