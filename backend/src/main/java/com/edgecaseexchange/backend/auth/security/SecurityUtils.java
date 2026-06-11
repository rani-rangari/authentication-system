package com.edgecaseexchange.backend.auth.security;

import com.edgecaseexchange.backend.auth.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {}

    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        // Since you are setting the User object as the principal in your filter
        if (principal instanceof User) {
            return ((User) principal).getEmail();
        }

        return null;
    }
}