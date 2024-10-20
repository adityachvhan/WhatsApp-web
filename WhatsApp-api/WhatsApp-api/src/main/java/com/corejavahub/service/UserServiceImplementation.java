package com.corejavahub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.corejavahub.config.JwtProvider;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.User;
import com.corejavahub.repository.UserRepository;
import com.corejavahub.request.UpdateUserRequest;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public User findUserById(Integer id) throws UserException {

		Optional<User> optional = userRepository.findById(id);

		if (optional.isPresent()) {

			return optional.get();
		}
		throw new UserException("No User Found With Id " + id);
	}

	@Override
	public User findUserProfile(String jwt) throws UserException {

		String email = jwtProvider.getEmailFromJwtToken(jwt);

		if (email == null) {

			throw new BadCredentialsException("Invalid Token...");
		}
		
		User user = userRepository.findByEmail(email);

		if (user == null) {

			throw new UserException("No User found");
		}
		return user;
	}
	
	

	@Override
	public User updateUser(Integer userId, UpdateUserRequest req) throws UserException {

		User user = findUserById(userId);

		if (req.getFull_name() != null) {

			user.setFull_name(req.getFull_name());
		}

		if (req.getProfile_picture() != null) {

			user.setProfile_picture(req.getProfile_picture());
		}

		return userRepository.save(user);
	}
	

	@Override
	public List<User> searchuser(String query) {

		List<User> users = userRepository.searchUser(query);
		
		return users;
	}

}
