package com.edgecaseexchange.backend.auth.service;

import com.edgecaseexchange.backend.auth.dto.AuthResponse;
import com.edgecaseexchange.backend.auth.dto.LoginRequest;
import com.edgecaseexchange.backend.auth.dto.SignupRequest;
import com.edgecaseexchange.backend.auth.exception.AuthException;
import com.edgecaseexchange.backend.auth.exception.UserNotFoundException;
import com.edgecaseexchange.backend.auth.model.User;
import com.edgecaseexchange.backend.auth.repository.UserRepository;
import com.edgecaseexchange.backend.auth.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AuthException("Email is already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setTokenVersion(0);

        userRepository.save(user);

        String accessToken = jwtUtil.generateToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return new AuthResponse(true, "Signup successful", user.getEmail(), accessToken, refreshToken, user.getFullName());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid email or password");
        }

        String accessToken = jwtUtil.generateToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return new AuthResponse(true, "Login successful", user.getEmail(), accessToken, refreshToken, user.getFullName());
    }

    public AuthResponse refreshSession(String oldRefreshToken) {
        String email = jwtUtil.extractEmail(oldRefreshToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));


        if (!jwtUtil.isTokenValid(oldRefreshToken, user.getEmail())) {
            throw new AuthException("Invalid or expired refresh token");
        }

        String newAccessToken = jwtUtil.generateToken(user.getEmail());
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return new AuthResponse(true, "Token refreshed successfully", user.getEmail(), newAccessToken, newRefreshToken, user.getFullName());
    }

    public void logout(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
