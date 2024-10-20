package com.corejavahub.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Email cannot be null or empty") 
    @Email(message = "Email should be valid")
    private String email;

    // This will map the JSON field to the Java field
    @JsonProperty("full_name") 
    private String full_name;

    private String profile_picture;

    @NotBlank(message = "Password cannot be null or empty") // Validates that password is not blank
    private String password;
}
