package com.edgecaseexchange.backend.auth.security;

import com.edgecaseexchange.backend.auth.exception.AuthException;
import com.edgecaseexchange.backend.auth.exception.TokenExpiredException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class JwtUtil {

    private final SecretKey secretKey;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;

    // 🔥 EDGE CASE FIX: In-memory cache to store recently rotated tokens and their new response pairs
    private final Map<String, CachedTokenPair> rotatedTokensCache = new ConcurrentHashMap<>();

    // Nested helper class to store cached token response structures
    public static class CachedTokenPair {
        private final String accessToken;
        private final String refreshToken;
        private final long expiryTime;

        public CachedTokenPair(String accessToken, String refreshToken, long gracePeriodMs) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.expiryTime = System.currentTimeMillis() + gracePeriodMs;
        }

        public String getAccessToken() { return accessToken; }
        public String getRefreshToken() { return refreshToken; }
        public boolean isExpired() { return System.currentTimeMillis() > expiryTime; }
    }

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration,
            @Value("${jwt.refresh.expiration:604800000}") long refreshTokenExpiration // Defaults to 7 days if omitted
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = expiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }


    public String generateToken(String email, int tokenVersion) {
        return Jwts.builder()
                .subject(email)
                .claim("tokenVersion", tokenVersion)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }


    public String generateRefreshToken(String email, int tokenVersion) {
        return Jwts.builder()
                .subject(email)
                .claim("tokenVersion", tokenVersion)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException("JWT token has expired");
        } catch (JwtException | IllegalArgumentException e) {
            throw new AuthException("Invalid or malformed JWT token");
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Integer extractTokenVersion(String token) {
        return extractClaim(token, claims -> claims.get("tokenVersion", Integer.class));
    }

    public boolean isTokenValid(String token, String userEmail) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(userEmail) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }


    public void cacheRotatedToken(String oldRefreshToken, String newAccessToken, String newRefreshToken) {
        // 5-second grace window for concurrent retries
        long GRACE_PERIOD_MS = 5000;
        rotatedTokensCache.put(oldRefreshToken, new CachedTokenPair(newAccessToken, newRefreshToken, GRACE_PERIOD_MS));
        rotatedTokensCache.entrySet().removeIf(entry -> entry.getValue().isExpired());
    }

    public CachedTokenPair getValidGracePeriodToken(String oldRefreshToken) {
        CachedTokenPair cachedPair = rotatedTokensCache.get(oldRefreshToken);
        if (cachedPair != null) {
            if (!cachedPair.isExpired()) {
                return cachedPair;
            } else {
                rotatedTokensCache.remove(oldRefreshToken);
            }
        }
        return null;
    }
}