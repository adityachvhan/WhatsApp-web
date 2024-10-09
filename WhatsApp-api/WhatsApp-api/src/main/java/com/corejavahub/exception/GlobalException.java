package com.corejavahub.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalException {

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetail> UserExceptionHandler(UserException e, WebRequest req) {

		ErrorDetail errorDetail = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());

		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetail> MessageExceptionHandler(MessageException messageException, WebRequest req) {

		ErrorDetail errorDetail = new ErrorDetail(messageException.getMessage(), req.getDescription(false),
				LocalDateTime.now());

		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ErrorDetail> ChatExceptionHandler(ChatException chatException, WebRequest req) {

		ErrorDetail errorDetail = new ErrorDetail(chatException.getMessage(), req.getDescription(false),
				LocalDateTime.now());

		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetail> MethodArgumentNotValidExceptionHandler(
			MethodArgumentNotValidException methodArgumentNotValidException, WebRequest req) {

		String error = methodArgumentNotValidException.getBindingResult().getFieldError().getDefaultMessage();

		ErrorDetail errorDetail = new ErrorDetail("Validation Error", error, LocalDateTime.now());

		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoHandlerFoundException	.class)
	public ResponseEntity<ErrorDetail> handleNoHandlerFoundExecption(NoHandlerFoundException noHandlerFoundException,
			WebRequest req) {

		ErrorDetail errorDetail = new ErrorDetail("Endpoint Not Found", noHandlerFoundException.getMessage(),
				LocalDateTime.now());

		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetail> otherExceptionHandler(Exception e, WebRequest req) {

		ErrorDetail errorDetail = new ErrorDetail(e.getMessage(), req.getDescription(false), LocalDateTime.now());

		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
}
