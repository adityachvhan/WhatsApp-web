package com.corejavahub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corejavahub.exception.ChatException;
import com.corejavahub.exception.MessageException;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.Message;
import com.corejavahub.model.User;
import com.corejavahub.request.SendMessageRequest;
import com.corejavahub.response.ApiResponse;
import com.corejavahub.service.MessageService;
import com.corejavahub.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest request,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		User user = userService.findUserProfile(jwt);

		request.setUserId(user.getId());
		Message message = messageService.sendMessage(request);
		return new ResponseEntity<Message>(message, HttpStatus.OK);
	}

	@GetMapping("/chat/{chatId}") 
	public ResponseEntity<List<Message>> getChatMessageHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException {

		User user = userService.findUserProfile(jwt);

		List<Message> message = messageService.getChatMessage(chatId, user);

		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	@DeleteMapping("/{messageId}")
	public ResponseEntity<ApiResponse> deleteMessageHandler(@PathVariable Integer messageId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException, MessageException {

		User user = userService.findUserProfile(jwt);

		messageService.deleteMessage(messageId, user);

		ApiResponse response = new ApiResponse("Message Deleted Successfully", false);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
