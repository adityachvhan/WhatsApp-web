package com.corejavahub.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String content;
	
	private LocalDateTime timeStamp;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "chat_id")
	private Chat chat;
}
