package com.corejavahub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corejavahub.exception.ChatException;
import com.corejavahub.exception.UserException;
import com.corejavahub.model.Chat;
import com.corejavahub.model.User;
import com.corejavahub.repository.ChatRepository;

@Service
public class ChatServiceimplementation implements ChatService {

	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private UserService userService;

	@Override
	public Chat createChat(User reqUser, Integer userId) throws UserException {

		User user = userService.findUserById(userId);

		Chat isChatExist = chatRepository.findSingleChatByUserIds(user, reqUser);

		if (isChatExist != null) {

			return isChatExist;
		}

		Chat chat = new Chat();
		chat.setCreatedBy(reqUser);  // Ensure reqUser has a valid ID
		chat.getUsers().add(user);   // Ensure user has a valid ID
		chat.getUsers().add(reqUser);

		chat.setGroup(false);

		return chat;
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {

		Optional<Chat> optional = chatRepository.findById(chatId);

		if (optional.isPresent()) {

			return optional.get();
		}
		throw new ChatException("No Chat Found... ");
	}

	@Override
	public List<Chat> findAllChatByUserId(Integer userId) throws UserException {

		User user = userService.findUserById(userId);

		List<Chat> chats = chatRepository.findChatByUserId(user.getId());

		return chats;
	}

	@Override
	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException, ChatException {

		Chat group = new Chat();
		group.setGroup(true);
		group.setChat_image(req.getChat_image());
		group.setChat_name(req.getChat_name());
		group.setCreatedBy(reqUser);
		group.getAdmins().add(reqUser);

		for (Integer userId : req.getUserIds()) {

			User user = userService.findUserById(userId);
			group.getUsers().add(user);
		}

//		group.setUsers(null);

		return group;
	}

	@Override
	public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {

		Optional<Chat> opt = chatRepository.findById(chatId);

		User user = userService.findUserById(userId);

		if (opt.isPresent()) {

			Chat chat = opt.get();

			if (chat.getAdmins().contains(reqUser)) {

				chat.getUsers().add(user);

				return chatRepository.save(chat);

			} else {

				throw new UserException("Not an Admin");
			}
		}

		throw new ChatException("No Chat Found with this id");
	}

	@Override
	public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {

		Optional<Chat> opt = chatRepository.findById(chatId);

		if (opt.isPresent()) {

			Chat chat = opt.get();

			if (chat.getUsers().contains(reqUser)) {

				chat.setChat_name(groupName);

				return chatRepository.save(chat);
			}

			throw new UserException("Not a member of Group");
		}

		throw new ChatException("No Chat Found with this id");
	}

	@Override
	public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {

		Optional<Chat> opt = chatRepository.findById(chatId);

		User user = userService.findUserById(userId);

		if (opt.isPresent()) {

			Chat chat = opt.get();

			if (chat.getAdmins().contains(reqUser)) {

				chat.getUsers().remove(user);

				return chatRepository.save(chat);

			} else if (chat.getUsers().contains(reqUser)) {

				if (user.getId().equals(reqUser.getId())) {

					chat.getUsers().remove(user);

					return chatRepository.save(chat);
				}
			}

			throw new UserException("Can't Remove User ");

		}

		throw new ChatException("No Chat Found with this id");
	}

	@Override
	public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {
		
		Optional<Chat> opt = chatRepository.findById(chatId);
		
		if (opt.isPresent()) {
			
			Chat chat=opt.get();
			
			chatRepository.deleteById(chat.getId());
		}
		
	}

}
