package com.edgecaseexchange.backend.auth.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Default value is set here, ensuring it never starts null
    @Column(nullable = false)
    private int tokenVersion = 0;

    public void incrementTokenVersion() {
        this.tokenVersion++;
    }
}