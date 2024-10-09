package com.corejavahub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.corejavahub.model.Chat;
import com.corejavahub.model.User;

// time of video == 2:50:16 
public interface ChatRepository extends JpaRepository<Chat, Integer> {

	@Query("select c from Chat c join c.users  u where u.id=:userId")
	public List<Chat> findChatByUserId(@Param("userId")Integer userId);

	@Query("select c from Chat c where c.isGroup=false AND :user member of c.users And :reqUser Member of c.users")
	public Chat findSingleChatByUserIds(@Param("user") User user, @Param("reqUser") User reqUser);
}
