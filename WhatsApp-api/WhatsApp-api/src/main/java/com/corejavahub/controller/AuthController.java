package com.corejavahub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corejavahub.config.JwtProvider;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.User;
import com.corejavahub.repository.UserRepository;
import com.corejavahub.request.LoginRequest;
import com.corejavahub.response.AuthResponse;
import com.corejavahub.service.CustomUserServiceImplementation;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private CustomUserServiceImplementation customUserServiceImplementation;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@org.springframework.web.bind.annotation.RequestBody User user) throws UserException {

		System.out.println("Received signup request: email=" + user.getEmail() + ", full_name=" + user.getFull_name()
				+ ", password=" + user.getPassword());

		String email=user.getEmail(); // Get email from the User object
		String full_name = user.getFull_name(); // Get full_name from the User object
		String password = user.getPassword(); // Get password from the User object

		if (email == null || email.isEmpty()) {
			throw new UserException("Email cannot be null or empty.");
		}

		if (full_name == null || full_name.isEmpty()) {
			throw new UserException("Full name cannot be null or empty.");
		}

		if (password == null || password.isEmpty()) {
			throw new UserException("Password cannot be null or empty.");
		}

		User isUser = userRepository.findByEmail(email);

		if (isUser != null) {
			throw new UserException("The email address is already associated with another account.");
		}

		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFull_name(full_name);
		createdUser.setPassword(passwordEncoder.encode(password)); // Correctly set the password

		userRepository.save(createdUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateToken(authentication);

		AuthResponse response = new AuthResponse(jwt, true);

		return new ResponseEntity<AuthResponse>(response, HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginHandler(@org.springframework.web.bind.annotation.RequestBody LoginRequest req) {

		String email = req.getEmail();
		String password = req.getPassword();

		Authentication authentication = authentication(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateToken(authentication);

		AuthResponse response = new AuthResponse(jwt, true);

		return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);

	}

	public Authentication authentication(String Username, String password) {

		UserDetails userDetails = customUserServiceImplementation.loadUserByUsername(Username);

		if (userDetails == null) {

			throw new BadCredentialsException("Invalid Username..");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {

			throw new BadCredentialsException("Invalid username or password.");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
