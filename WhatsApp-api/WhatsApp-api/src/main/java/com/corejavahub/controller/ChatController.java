package com.corejavahub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corejavahub.exception.ChatException;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.Chat;
import com.corejavahub.model.User;
import com.corejavahub.request.SingleChatRequest;
import com.corejavahub.response.ApiResponse;
import com.corejavahub.service.ChatService;
import com.corejavahub.service.GroupChatRequest;
import com.corejavahub.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

	@Autowired
	private ChatService chatService;

	@Autowired
	private UserService userService;

	@PostMapping("/single")
	public ResponseEntity<Chat> createChatHandler(@org.springframework.web.bind.annotation.RequestBody SingleChatRequest singleChatRequest,
			@RequestHeader("Authorization") String jwt) throws UserException {

		System.out.println("Received userId: " + singleChatRequest.getUserId());

		User reqUser = userService.findUserProfile(jwt);

		Chat chat = chatService.createChat(reqUser, singleChatRequest.getUserId());

		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@PostMapping("/group")
	public ResponseEntity<Chat> createGroupHandler(@org.springframework.web.bind.annotation.RequestBody GroupChatRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(jwt);

		Chat chat = chatService.createGroup(req, reqUser);

		return new ResponseEntity<Chat>(chat, HttpStatus.OK);

	}

	@GetMapping("/{chatId}")
	public ResponseEntity<Chat> findChatByIdHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		Chat chat = chatService.findChatById(chatId);

		return new ResponseEntity<Chat>(chat, HttpStatus.OK);

	}

	@GetMapping("/user")
	public ResponseEntity<List<Chat>> findAllChatByUserIdHandler(@RequestHeader("Authorization") String jwt)
			throws UserException {

		// Extract user profile from the token
	    User reqUser = userService.findUserProfile(jwt);
	    
	    if (reqUser == null) {
	        throw new UserException("User not found for the provided JWT");
	    }

	    System.out.println("User ID retrieved: " + reqUser.getId());

	    // Fetch chats by user ID
	    List<Chat> chats = chatService.findAllChatByUserId(reqUser.getId());

	    return new ResponseEntity<>(chats, HttpStatus.OK);

	}

	@PutMapping("/{chatId}/add/{userId}")
	public ResponseEntity<Chat> adduserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(jwt);

		Chat chats = chatService.addUserToGroup(userId, chatId, reqUser);

		return new ResponseEntity<Chat>(chats, HttpStatus.OK);

	}

	@PutMapping("/{chatId}/remove/{userId}")
	public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(jwt);

		Chat chats = chatService.removeFromGroup(chatId, userId, reqUser);

		return new ResponseEntity<Chat>(chats, HttpStatus.OK);

	}

	@DeleteMapping("/delete/{chatId}")
	public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(jwt);

		chatService.deleteChat(chatId, reqUser.getId());

		ApiResponse response = new ApiResponse("Chat Deleted Successfully", false);

		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);

	}

}
