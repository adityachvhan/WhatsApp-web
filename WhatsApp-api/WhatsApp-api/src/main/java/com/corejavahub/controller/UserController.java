package com.corejavahub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corejavahub.exception.UserException;
import com.corejavahub.model.User;
import com.corejavahub.request.UpdateUserRequest;
import com.corejavahub.response.ApiResponse;
import com.corejavahub.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/profile")
	public ResponseEntity<User> getuserProfilehandler(@RequestHeader("Authorization") String token)
			throws UserException {

		User user = userService.findUserProfile(token);

		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping("/{query}")
	public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String q) {

		List<User> users = userService.searchuser(q);

		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@PostMapping("/update")
	public ResponseEntity<ApiResponse> updateuserHandler(@RequestBody UpdateUserRequest req,
			@RequestHeader("Authorization") String token) throws UserException {

		User user = userService.findUserProfile(token);

		userService.updateUser(user.getId(), req);

		ApiResponse apiResponse = new ApiResponse("User data updated Successfully", true);

		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.ACCEPTED);
	}

}
