package com.corejavahub.service;

import java.util.List;

import com.corejavahub.exception.ChatException;
import com.corejavahub.exception.MessageException;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.Message;
import com.corejavahub.model.User;
import com.corejavahub.request.SendMessageRequest;

public interface MessageService {

	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;

	public List<Message> getChatMessage(Integer chatId,User reqUser) throws ChatException, UserException;

	public Message findMessageById(Integer messageId) throws MessageException;

	public void deleteMessage(Integer messageId,User reqUser) throws MessageException, UserException;
}
