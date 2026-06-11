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

        String token = jwtUtil.generateToken(user.getEmail(), user.getTokenVersion());

        return new AuthResponse(true, "Signup successful", user.getEmail(), token, user.getFullName());
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getTokenVersion());

        return new AuthResponse(true, "Login successful", user.getEmail(), token, user.getFullName());
    }

    public void logout(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.incrementTokenVersion();
        userRepository.save(user);
    }
}





