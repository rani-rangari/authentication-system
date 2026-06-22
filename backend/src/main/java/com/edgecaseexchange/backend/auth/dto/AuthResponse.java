package com.edgecaseexchange.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private boolean success;
    private String message;
    private String email;
    private String token;
    private String refreshToken;
    private String fullName;
}