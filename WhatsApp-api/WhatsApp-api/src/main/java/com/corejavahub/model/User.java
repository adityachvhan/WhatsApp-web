package com.corejavahub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String full_name;

    private String email;

    private String profile_picture;

    // Correct the typo here
    private String password;  // Change 'passwrod' to 'password'
}
