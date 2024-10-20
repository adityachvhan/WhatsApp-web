package com.corejavahub.service;

import java.util.List;

import com.corejavahub.exception.ChatException;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.Chat;
import com.corejavahub.model.User;

public interface ChatService {

	public Chat createChat(User reqUser,Integer userId)  throws UserException;
	
	public Chat findChatById(Integer chatId) throws ChatException;

	public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException, ChatException;

	public Chat addUserToGroup(Integer userId, Integer chatId,User reqUser) throws UserException, ChatException;

	public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException;

	public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

	public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException;
}
