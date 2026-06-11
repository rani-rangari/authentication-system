package com.edgecaseexchange.backend.auth.exception;

public class TokenExpiredException extends AuthException {
    public TokenExpiredException(String message) {
        super(message);
    }
}
