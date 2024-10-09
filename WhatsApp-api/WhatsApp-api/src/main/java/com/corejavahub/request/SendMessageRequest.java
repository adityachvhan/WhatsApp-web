package com.corejavahub.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendMessageRequest {

	private Integer chatId;
	
	private Integer userId;
	
	private String content;
}
