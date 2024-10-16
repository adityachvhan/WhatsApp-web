package com.corejavahub.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corejavahub.exception.ChatException;
import com.corejavahub.exception.MessageException;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.Chat;
import com.corejavahub.model.Message;
import com.corejavahub.model.User;
import com.corejavahub.repository.MessageRepository;
import com.corejavahub.request.SendMessageRequest;

@Service
public class MessageServiceImplementation implements MessageService {

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private ChatService chatService;

	@Override
	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException {

		User user = userService.findUserById(req.getUserId());

		Chat chat = chatService.findChatById(req.getChatId());

		Message message = new Message();
		message.setChat(chat);
		message.setUser(user);
		message.setContent(req.getContent());
		message.setTimeStamp(LocalDateTime.now());

		return message;
	}

	@Override
	public List<Message> getChatMessage(Integer chatId, User reqUser) throws ChatException, UserException {

		Chat chat = chatService.findChatById(chatId);

		if (chat.getUsers().contains(reqUser)) {

			throw new UserException("You are not related to this Chat...");
		}

		List<Message> messages = messageRepository.findByChatId(chat.getId());

		return messages;
	}

	@Override
	public Message findMessageById(Integer messageId) throws MessageException {

		Optional<Message> optional = messageRepository.findById(messageId);

		if (optional.isPresent()) {

			return optional.get();
		}

		throw new MessageException("No Message Found");
	}

	@Override
	public void deleteMessage(Integer messageId, User reqUser) throws MessageException, UserException {

		Message message = findMessageById(messageId);

		if (message.getUser().getId().equals(reqUser.getId())) {

			messageRepository.deleteById(messageId);
		}

		throw new UserException("Can not delete others message");
	}

}
