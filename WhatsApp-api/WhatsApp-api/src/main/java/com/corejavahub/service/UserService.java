package com.corejavahub.service;

import java.util.List;

import com.corejavahub.exception.UserException;
import com.corejavahub.model.User;
import com.corejavahub.request.UpdateUserRequest;

public interface UserService {

	public User findUserById(Integer id) throws UserException;

	public User findUserProfile(String jwt) throws UserException;

	public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

	public List<User> searchuser(String query);
}
